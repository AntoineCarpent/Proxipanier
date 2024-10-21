import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        setEmailError('');
        setPasswordError('');
        setGeneralError('');

        if (!email) {
            setEmailError('Veuillez entrer un email.');
            return;
        }
        if (!password) {
            setPasswordError('Veuillez entrer un mot de passe.');
            return;
        }

        axios.post('http://localhost:8000/api/login', {
            email,
            password
        })
            .then(response => {
                if (response.data.token && response.data.user) {
                    const { token, user } = response.data;

                    localStorage.setItem('token', token);
                    localStorage.setItem('id', user.id);
                    localStorage.setItem('role', user.role);

                    if (user.role === 1) {
                        navigate('/');
                    } else if (user.role === 2) {
                        navigate(`/producer/${user.id}`);
                    }
                } else {
                    setGeneralError('Les données utilisateur sont manquantes.');
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.log("errors", error.response.data.errors);
                    setError(error.response.data.errors);
                }
            });
    };

    return (
        <div>
            <div
                className="w-full h-96 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/agriculteur.jpg')" }}
            ></div>

            <div className="flex items-center justify-center min-h-[70vh]" style={{ backgroundColor: '#0e2631' }}>
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
                        <label className="flex flex-col gap-1">
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

                            {error.email && <p style={{ color: 'red' }}>{error.email[0]}</p>}

                        <label className="flex flex-col gap-1">
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

                        {error.password && <p style={{ color: 'red' }}>{error.password[0]}</p>}

                        <button type="submit" className="btn w-full" style={{ backgroundColor: '#FBD784', color: '#0e2631' }}>Se connecter</button>
                        {generalError && <p className="text-red-500 text-center">{generalError}</p>}
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
