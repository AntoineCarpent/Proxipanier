import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer footer-center bg-[#0B1D26] text-white rounded-t p-10 mt-20 flex h-24">
            <Link to="/" className="btn btn-ghost h-24">
                <img
                    src="/images/logo.png"
                    alt="Logo"
                    className="h-24 w-auto object-contain"
                />
            </Link>
            <nav className="grid grid-flow-col gap-4">
                <li><Link to="/" className="hover:text-[#FBD784]">Acceuil</Link></li>
                <li><Link to="/create" className="hover:text-[#FBD784]">Ajouter une transaction</Link></li>
                <li><Link to="/graph" className="hover:text-[#FBD784]">Graphique</Link></li>
            </nav>
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All rights reserved by ACME Industries Ltd</p>
            </aside>
        </footer>
    );
};

export default Footer;
