import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer footer-center bg-[#f5f5f5] text-black rounded-t p-10 border-t border-gray-200 fixed bottom-0 w-full">
            <nav className="grid grid-flow-col gap-4">
                <li><Link to="/">Acceuil</Link></li>
                <li><Link to="/create">Ajouter une transaction</Link></li>
                <li><Link to="/graph">Graphique</Link></li>
            </nav>
            <aside>
                <p className="text-black">Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
            </aside>
        </footer>
    );
};

export default Footer;
