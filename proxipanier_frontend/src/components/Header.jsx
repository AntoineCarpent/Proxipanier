import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        navigate('/login');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        const role = localStorage.getItem('role');

        if (token && id) {
            axios.get(`http://localhost:8000/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setUser(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error.response);
                    handleLogout();
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [navigate]);

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
    if (isAuthPage || loading) {
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
                {/* Dropdown pour écrans larges */}
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
                        <li>
                            <Link to='/' className="link no-underline">
                                <FontAwesomeIcon icon={faHouse} /> Accueil
                            </Link>
                        </li>
                        <li>
                            {user ? (
                                <>
                                    {user.role === 1 ? (
                                        <Link to={`/user/${user.id}`} className="link no-underline"><FontAwesomeIcon icon={faUser} />Mon compte</Link>
                                    ) : user.role === 2 ? (
                                        <Link to={`/producer/${user.id}`} className="link no-underline"><FontAwesomeIcon icon={faUser} />Mon compte</Link>
                                    ) : (
                                        <span>Rôle non spécifié</span>
                                    )}
                                </>
                            ) : (
                                <span>Utilisateur non trouvé</span>
                            )}
                        </li>
                        <li><button onClick={handleLogout} className="link no-underline"><FontAwesomeIcon icon={faRightFromBracket} />Déconnexion</button></li>
                    </ul>
                </div>
    
                {/* Menu pour écrans petits à moyens */}
                <div className="dropdown lg:hidden">
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
                        <li>
                            <Link to='/' className="link no-underline">
                                <FontAwesomeIcon icon={faHouse} /> Accueil
                            </Link>
                        </li>
                        <li>
                            {user ? (
                                <>
                                    {user.role === 1 ? (
                                        <Link to={`/user/${user.id}`} className="link no-underline"><FontAwesomeIcon icon={faUser} />Mon compte</Link>
                                    ) : user.role === 2 ? (
                                        <Link to={`/producer/${user.id}`} className="link no-underline"><FontAwesomeIcon icon={faUser} />Mon compte</Link>
                                    ) : (
                                        <span>Rôle non spécifié</span>
                                    )}
                                </>
                            ) : (
                                <span>Utilisateur non trouvé</span>
                            )}
                        </li>
                        <li><button onClick={handleLogout} className="link no-underline"><FontAwesomeIcon icon={faRightFromBracket} />Déconnexion</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
    
};

export default Header;
