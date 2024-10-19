import React from 'react'
import { Link } from 'react-router-dom'
import { navLinks } from '../data';

const Footer: React.FC = () => {

    const renderedLinks = navLinks.map((link) => (
        <Link to={link.href} key={link.name} className="" onClick={() => link.href}>
            {link.name}
        </Link>
    ));
    return (
        <footer className='p-4 md:py-8'>
            <div className='container px-4 mx-auto'>
                <div className='flex justify-between items-center'>

                <Link to="/" className="flex gap-2">
                    <img src="/images/logo.svg" alt="logo" />
                </Link>
                <div className='space-x-4 xl:space-x-10 tracking-tighter font-medium text-gray1'>
                    {renderedLinks}
                </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
