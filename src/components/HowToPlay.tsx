import React from 'react';
import WinnerList from './WinnersList';
import { steps } from '../data';


const HowToPlay: React.FC = () => {
    return (
        <section className=" py-12 px-4 md:py-20 w-full gap-4">
            <div className="container mx-auto flex">


                <div className=' md:basis-4/5 mx-auto'>
                    <h2 className="text-3xl md:text-5xl mb-4">How to Play</h2>
                    <p className='max-md:text-sm text-gray1 lg:w-3/5'>Playing is Easy! Just follow this easy steps: Subscribe, Scratch the designated area, and Claim your prizes.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 my-10">
                        {steps.map((stepItem, index) => (
                            <div key={index} className=" space-y-3">
                                <img src={stepItem.image} alt={stepItem.step} />
                                <p className='text-dark font-semibold'>{stepItem.title}</p>
                                <p className='text-gray1'>{stepItem.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='hidden md:basis-1/5'>
                    <WinnerList />
                </div>
            </div>
        </section>
    );
};

export default HowToPlay;
