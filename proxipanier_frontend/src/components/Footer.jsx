import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer footer-center bg-[#0e2631] text-white rounded-t mt-20 flex h-24">
            <Link to="/" className="btn btn-ghost h-24">
                <img
                    src="/images/logo.png"
                    alt="Logo"
                    className="h-24 w-auto object-contain"
                />
            </Link>
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All rights reserved by ACME Industries Ltd</p>
            </aside>
        </footer>
    );
};

export default Footer;
