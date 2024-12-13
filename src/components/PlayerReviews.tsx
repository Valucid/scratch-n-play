import React from 'react';
import { Link } from 'react-router-dom';
import { reviews } from '../data';

const PlayerReviews: React.FC = () => {
    return (
        <section id='review' className="py-12 md:py-20 bg-dark text-light rounded-xl mx-1 md:mx-5 px-4">
            <div className="container mx-auto">
                <div className='text-center mb-10'>

                    <h2 className="text-3xl md:text-5xl">Player Reviews</h2>
                    <p className='max-md:text-sm text-gray2'>Here’s how our players are enjoying our games, you can join in too!</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-gray1 p-6 rounded-lg shadow-md">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-left flex gap-2 items-center">
                                    <div className="bg-black/10 rounded-full h-10 w-10"></div>
                                    <p className="">{review.name}</p>
                                </div>

                                <div className="text-[#FFC700]">
                                    {Array.from({ length: review.rating }).map((_, i) => (
                                        <span key={i}>⭐</span>
                                    ))}
                                </div>

                            </div>
                            <p className="text-light">{review.review}</p>
                        </div>
                    ))}
                </div>
                <div className='flex justify-center'>
                    <Link
                        to="/scratch-game"
                        className="bg-light text-dark py-3 px-8 mt-8 text-sm md:text-base inline-block font-semibold rounded-lg "
                    >
                        Start Playing
                    </Link>
                </div>
            </div>

        </section>
    );
};

export default PlayerReviews;
