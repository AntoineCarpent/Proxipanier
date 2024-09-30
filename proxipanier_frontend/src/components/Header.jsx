import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const [id, setUserId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        navigate('/login');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            axios.get(`http://localhost:8000/api/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                const userId = response.data.id;
                setUserId(userId);
                localStorage.setItem('id', userId);
            })
            .catch(() => {
                handleLogout();
            });
        }
    }, [navigate]);

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
    if (isAuthPage) {
        return null;
    }

    return (
        <div className="navbar bg-[#0e2631] w-full h-24">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost h-24">
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="h-24 w-auto object-contain"
                    />
                </Link>
            </div>

            <div className="navbar-end">
                <div className="dropdown hidden lg:block">
                    <div tabIndex={0} className="btn btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-md dropdown-content bg-[#0e2631] rounded-box z-[1] mt-3 w-40 right-0 p-2 shadow text-[#FBD784]">
                        <li><Link to='/' className="link no-underline">Acceuil</Link></li>
                        <li><Link to={`/user/${id}`} className="link no-underline">Mon compte</Link></li>
                        <li><button onClick={handleLogout} className="link no-underline">Déconnexion</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
