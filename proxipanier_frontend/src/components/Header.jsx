import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const [scrolling, setScrolling] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleScroll = () => {
        setScrolling(window.scrollY > 0);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    if (isAuthPage) {
        return null;
    }

    return (
        <div className={`navbar fixed top-0 left-0 w-full z-10 transition-colors duration-300 h-24 ${scrolling ? 'bg-[#0B1D26]' : 'bg-transparent'} text-white`}>
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost h-24">
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="h-24 w-auto object-contain"
                    />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className={`menu menu-horizontal px-1 ${scrolling ? 'text-[#ffffff]' : 'text-[#000000]'}`}>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/create-transaction">Ajouter une transaction</Link></li>
                    <li><Link to="/graph">Graphique</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <button
                    className={`btn border transition duration-300 mr-5 ${scrolling ? 'border-[#FBD784] text-[#FBD784] hover:bg-[#FBD784] hover:text-[#0B1D26]' : 'text-white hover:bg-transparent hover:text-[#000000]'}`}
                    onClick={handleLogout}
                >
                    Déconnexion
                </button>
            </div>
        </div>
    );
};

export default Header;
