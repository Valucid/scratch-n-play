import React from 'react'
import AccordionItem from '../components/Accordion'
import { termsData } from '../data'

const Terms:React.FC = () => {
    return (
        <section className='container mx-auto'>
            <div className='my-16'>
                <h2 className="text-3xl md:text-5xl mb-4">Scratch and Play Terms and Conditions
                </h2>
                <p className="text-center text-lg lg:text-2xl my-4">These Terms and Conditions govern participation in the Scratch and Play promotion. By participating, you agree to the following:
                </p>
                <div className='space-y-4'>

                {termsData.map((section, idx) => (
                    <AccordionItem
                    key={idx}
                    title={section.title}
                    content={section.content}
                    />
                ))}
                </div>
            </div>

        </section>
    )
}

export default Terms
