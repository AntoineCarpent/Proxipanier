import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer bg-[#0e2631] text-white rounded-t mt-12 flex flex-col items-center h-32">
            <div className="w-full flex justify-between items-center px-8">

                <Link to="/" className="h-24">
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="h-24 w-auto object-contain"
                    />
                </Link>

                <ul className="flex space-x-4">
                    <li>
                        <Link to="/legal-mention" className="text-white">
                            Mentions légales
                        </Link>
                    </li>
                    <li>
                        <Link to="/charte-de-confidentialité" className="text-white">
                            Charte de confidentialité
                        </Link>
                    </li>
                </ul>
            </div>

            <aside className="mt-4 text-center">
                <p>Copyright © {new Date().getFullYear()} - All rights reserved by ACME Industries Ltd</p>
            </aside>
        </footer>
    );
    
};

export default Footer;
