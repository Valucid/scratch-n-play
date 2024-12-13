import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import { CustomCountryCode } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
    const [value, setValue] = useState<string>();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const allowedCountries: CustomCountryCode[] = ['NG'];
    const [error, setError] = useState<string | null>(null);
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
    const [subscriptionMessage, setSubscriptionMessage] = useState<string>('');

    const handleLogin = async () => {
        if (!value || !isPossiblePhoneNumber(value)) {
            setError('Please enter a valid phone number');
            return;
        }
        setLoading(true);
        setError(null);
    
        const msisdn = value.replace('+', '');

        try {
            const response = await axios.post('https://api.valucid.com/api/v1/auth-user', { msisdn });


            if (response.data.status === 200) {
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('msisdn', msisdn);
                navigate('/scratch-game');
            } else if (response.data.status === 400 && response.data.msg.includes('active subscription')) {
                setSubscriptionMessage(response.data.msg);
                setShowSubscriptionModal(true);
            } else {
                setError(response.data.msg || 'Login failed.');
            }
        } catch (err) {
            console.error('API Error:', err); // Debug log

            // Ensure Axios error is handled correctly
            if (axios.isAxiosError(err)) {
                const apiError = err.response?.data;
                if (apiError?.status === 400 && apiError?.msg.includes('active subscription')) {
                    setSubscriptionMessage(apiError.msg);
                    setShowSubscriptionModal(true);
                } else if (apiError?.msg) {
                    setError(apiError.msg);
                } else {
                    setError('An error occurred. Please try again.');
                }
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };


    const handleSubscribe = () => {
        window.location.href = 'sms:20444?body=PLAY';
        setShowSubscriptionModal(false)
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-600 bg-cover font-inria px-4">
            <div className="bg-white/50 backdrop-blur-md py-16 px-8 rounded-3xl shadow-custom w-full md:max-w-3xl text-center">
                <Link to="/" className="">
                    <img src="/images/logo.svg" alt="Logo" className="mx-auto" />
                </Link>

                <h2 className="font-semibold mt-6 text-3xl">Scratch, Win, and Celebrate!</h2>
                <div className="my-10 mx-auto md:w-3/5 text-white">
                    <label htmlFor="phone" className="block text-left text-sm italic mb-2">Enter your phone number to login</label>
                    <PhoneInput
                        international
                        defaultCountry="NG"
                        value={value}
                        onChange={setValue}
                        className="custom-phone-input"
                        countries={allowedCountries}
                    />
                </div>
                {error && <div className="text-red-500 text-xs italic">{error}</div>}

                <button
                    className="w-full py-3 rounded-full bg-black md:w-2/5 mx-auto mt-6 text-white"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Login'}
                </button>
            </div>
            {showSubscriptionModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <p className="mb-4">{subscriptionMessage}</p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded"
                                onClick={handleSubscribe}
                            >
                                Yes
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={() => setShowSubscriptionModal(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
