import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X,  Menu } from 'lucide-react';
import { navLinks } from '../data';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    const handleLinkClick = (path: string) => {
        setIsMenuOpen(false);
        navigate(path);
    };

    const renderedLinks = navLinks.map((link) => (
        <a href={link.href} key={link.name} className="" onClick={() => handleLinkClick(link.href)}>
            {link.name}
        </a>
    ));

    return (
        <nav className="relative z-40 p-4 text-gray1 bg-light">
            <div className="container flex items-center justify-between mx-auto">
                <Link to="/" className="flex gap-2">
                    <img src="/images/logo.svg" alt="logo" />
                </Link>

                <div className="hidden md:flex items-center space-x-4 xl:space-x-10 text-sm">
                    {renderedLinks}

                    <button
                        className="bg-[#ED222F] text-light py-2 px-4 rounded-lg font-semibold"
                        onClick={() => navigate(token ? '/scratch-game' : '/login')}
                    >
                        {token ? 'Start Playing' : 'Login'}
                    </button>
                </div>

                <div className='md:hidden flex items-center gap-8 '>


                    <Menu onClick={() => setIsMenuOpen(!isMenuOpen)}/>

                </div>

                <div
                    className={`fixed top-0 bottom-0 left-0 right-0 w-full z-50 bg-light p-4 transform ${
                        isMenuOpen ? 'translate-y-0' : '-translate-y-full'
                    } transition-transform duration-300 ease-in md:hidden`}
                >
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex gap-2">
                            <img src="/images/logo.svg" alt="logo" />
                        </Link>

                        <X onClick={() => setIsMenuOpen(!isMenuOpen)} />
                    </div>

                    <div className="flex flex-col space-y-4 my-10 text-xl tracking-tighter font-medium">
                        {renderedLinks}

                        <button
                            className="bg-[#ED222F] text-light py-2 px-4 rounded-lg font-semibold"
                            onClick={() => navigate(token ? '/scratch-game' : '/login')}
                        >
                            {token ? 'Start Playing' : 'Login'}
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
