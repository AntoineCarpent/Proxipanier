import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Register() {
    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [role, setRole] = useState(1);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                name,
                firstname,
                email,
                password,
                address,
                city,
                role,
            });
            console.log('User registered:', response.data);

            navigate('/login');
        } catch (err) {
            setError('Registration failed.');
        }
    };

    return (
        <div>
            <div
                className="w-full h-96 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/agriculture-850.jpg')" }}
            ></div>

            <div className="flex items-center justify-center min-h-[70vh] mt-20" style={{ backgroundColor: '#0e2631' }}>
                <div
                    className="w-full max-w-md md:w-2/5 p-8 rounded-lg shadow-lg"
                    style={{
                        backgroundColor: '#0e2631',
                        border: '1px solid #FBD784',
                        borderRadius: '10px',
                    }}
                >
                    <h1 className="text-2xl font-bold text-center mb-6" style={{ color: '#FFFFFF' }}>Inscription</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="text"
                                className="grow bg-transparent p-2 outline-none"
                                placeholder="Nom"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                style={{
                                    color: '#FFFFFF',
                                    borderColor: '#FBD784',
                                    borderRadius: '10px',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                }}
                            />
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="text"
                                className="grow bg-transparent p-2 outline-none"
                                placeholder="Prénom"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                required
                                style={{
                                    color: '#FFFFFF',
                                    borderColor: '#FBD784',
                                    borderRadius: '10px',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                }}
                            />
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="email"
                                className="grow bg-transparent p-2 outline-none"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    color: '#FFFFFF',
                                    borderColor: '#FBD784',
                                    borderRadius: '10px',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                }}
                            />
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="password"
                                className="grow bg-transparent p-2 outline-none"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    color: '#FFFFFF',
                                    borderColor: '#FBD784',
                                    borderRadius: '10px',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                }}
                            />
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="text"
                                className="grow bg-transparent p-2 outline-none"
                                placeholder="Adresse"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                style={{
                                    color: '#FFFFFF',
                                    borderColor: '#FBD784',
                                    borderRadius: '10px',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                }}
                            />
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="text"
                                className="grow bg-transparent p-2 outline-none"
                                placeholder="Ville"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                style={{
                                    color: '#FFFFFF',
                                    borderColor: '#FBD784',
                                    borderRadius: '10px',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                }}
                            />
                        </label>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                className={`btn ${role === 1 ? 'btn-primary' : ''}`}
                                onClick={() => setRole(1)}
                                style={{
                                    borderColor: '#FBD784',
                                    borderRadius: '10px',
                                    backgroundColor: role === 1 ? '#FBD784' : 'transparent',
                                    color: role === 1 ? '#0B1D26' : '#FFFFFF',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                }}
                            >
                                Consommateur
                            </button>
                            <button
                                type="button"
                                className={`btn ${role === 2 ? 'btn-primary' : ''}`}
                                onClick={() => setRole(2)}
                                style={{
                                    borderColor: '#FBD784',
                                    borderRadius: '10px',
                                    backgroundColor: role === 2 ? '#FBD784' : 'transparent',
                                    color: role === 2 ? '#0e2631' : '#FFFFFF',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                }}
                            >
                                Producteur
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="btn w-full"
                            style={{
                                backgroundColor: '#FBD784',
                                color: '#0e2631',
                                border: '2px solid #FBD784',
                                borderRadius: '10px',
                            }}
                        >
                            S'inscrire
                        </button>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                    </form>
                    <p className="mt-4 text-center" style={{ color: '#FFFFFF' }}>
                        Déjà un compte? <a href="/login" style={{ color: '#FBD784' }}>Se connecter</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
