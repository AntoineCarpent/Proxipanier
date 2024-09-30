import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/login', {
            email,
            password
        })
        .then(response => {
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            
            if (user) {
                const userId = user.id;
                const userRole = user.role;
                localStorage.setItem('userId', userId);

                if (userRole === 1) {
                    navigate('/');
                } else if (userRole === 2) {
                    navigate(`/user/${userId}`);
                }
            } else {
                console.error('User data is undefined:', response.data);
            }
        })
        .catch(error => {
            const errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de la connexion.';
            setError(errorMessage);
        });
    };

    return (
        <div>
            <div
                className="w-full h-96 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/agriculteur.jpg')" }}
            ></div>

            <div className="flex items-center justify-center min-h-[70vh]" style={{ backgroundColor: '#0B1D26' }}>
                <div
                    className="w-full max-w-md md:w-2/5 p-8 rounded-lg shadow-lg"
                    style={{
                        backgroundColor: '#0e2631',
                        border: '1px solid #FBD784',
                        borderRadius: '10px',
                    }}
                >
                    <h1 className="text-2xl font-bold text-center mb-6" style={{ color: '#FFFFFF' }}>Connexion</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="email"
                                className="grow p-2 outline-none"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    backgroundColor: 'transparent',
                                    color: '#FFFFFF',
                                    outline: '2px solid #FBD784',
                                    borderRadius: '10px',
                                    padding: '10px',
                                }}
                            />
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="password"
                                className="grow p-2 outline-none"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    backgroundColor: 'transparent',
                                    color: '#FFFFFF',
                                    outline: '2px solid #FBD784',
                                    borderRadius: '10px',
                                    padding: '10px',
                                }}
                            />
                        </label>
                        <button type="submit" className="btn w-full" style={{ backgroundColor: '#FBD784', color: '#0e2631' }}>Se connecter</button>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                    </form>
                    <p className="mt-4 text-center" style={{ color: '#FFFFFF' }}>
                        Pas encore de compte? <a href="/register" style={{ color: '#FBD784' }}>S'inscrire</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
