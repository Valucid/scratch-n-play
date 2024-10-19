import React from 'react';
import { whyScratch } from '../data';

const WhyScratchHere: React.FC = () => {
    return (
        <section className=" py-12 px-4 md:py-20 w-full gap-4 text-center">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-5xl mb-4">Why Scratch Here?</h2>
                <p className='max-md:text-sm text-gray1'>Playing is Easy! Just follow this easy steps: Subscribe, Scratch the designated area, and Claim your prizes.</p>

                <div className="grid grid-cols-1 md:grid-cols-3  my-10">
                    {whyScratch.map((item, index) => (
                        <div key={index} className=" ">
                            <img className='w-max mx-auto mb-6' src={item.image} alt={item.title} />
                            <p className='text-dark font-semibold'>{item.title}</p>
                            <p className='text-gray1'>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyScratchHere;
