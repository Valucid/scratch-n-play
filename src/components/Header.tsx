import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const token = sessionStorage.getItem('token');
    return (
        <header className="text-light mx-1 md:mx-5 px-4 rounded-[20px] bg-[url(/images/header-bg.svg)] bg-center bg-no-repeat bg-cover">
            <div className="container mx-auto py-10 md:py-20 flex justify-between relative">
                <div className='w-4/5 sm:w-3/5 lg:w-2/5'>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl ">Scratch, Win, and Celebrate!</h1>
                    <p className="mt-1 text-sm md:text-base">Feeling lucky? Play and reveal exciting rewards waiting just for you!</p>
                    <Link
                        to={token ? '/scratch-game' : '/login'}
                        className="bg-light text-dark py-3 px-8 mt-8 text-sm md:text-base inline-block font-semibold rounded-lg"
                    >
                        Play Now
                    </Link>
                </div>

            </div>
        </header>
    );
};

export default Header;
