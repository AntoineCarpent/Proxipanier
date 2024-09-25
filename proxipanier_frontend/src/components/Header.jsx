import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const [scrolling, setScrolling] = useState(false);
    const [userId, setUserId] = useState(null);
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

        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
    if (isAuthPage) {
        return null;
    }

    return (
        <div className={`navbar top-0 left-0 w-full h-24 bg-[#0e2631] ${scrolling ? 'shadow-md' : ''}`}>
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost h-24">
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="h-24 w-auto object-contain"
                    />
                </Link>
                {userId && (
                    <Link to={`/user/${userId}`} className="text-[#FBD784] ml-4">
                        <p>Mon compte</p>
                    </Link>
                )}
            </div>
            <div className="navbar-end">
                <button
                    className="btn border-[#FBD784] hover:text-[#0e2631] hover:bg-[#FBD784] bg-[#0e2631] text-[#FBD784]"
                    onClick={handleLogout}
                >
                    Déconnexion
                </button>
            </div>
        </div>
    );
};

export default Header;
