
import React from 'react';
import { faq } from '../data';
import AccordionItem from './Accordion';

const Faq: React.FC = () => {
    return (
        <section className=" px-4 pb-12 md:pb-20 w-full gap-4">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl md:text-5xl mb-4">Frequently Asked Questions</h2>
                <p className='max-md:text-sm text-gray1'>What would you like to know? we’ve got it covered.</p>
                <div className="mx-auto space-y-4">
                    {faq.map((item, idx) => (
                        <AccordionItem
                            key={idx}
                            title={item.heading}
                            content={item.text}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;
