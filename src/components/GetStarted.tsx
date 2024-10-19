import React from 'react';
import { Link } from 'react-router-dom';

const GetStarted: React.FC = () => {
    return (
        <section className="py-12  text-light rounded-xl mx-1 md:mx-5 px-4 bg-[url(/images/cta.svg)] bg-no-repeat bg-cover">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-5xl mb-4">Why Scratch Here?</h2>
                <p className='max-md:text-sm text-light'>Playing is Easy! Just follow this easy steps: Subscribe, Scratch the designated area, and Claim your prizes.</p>
                <Link
                    to="/scratch-game"
                    className="bg-light text-dark py-3 px-8 mt-8 text-sm md:text-base inline-block font-semibold rounded-lg "
                >
                    Play Now
                </Link>
            </div>
        </section>
    );
};

export default GetStarted;
