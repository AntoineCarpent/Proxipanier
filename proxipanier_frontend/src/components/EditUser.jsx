import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Picture from './Picture';

const EditUser = () => {
    const { id } = useParams();
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (id) {
            axios.get(`http://localhost:8000/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    const user = response.data;
                    console.log('Transaction récupérée:', user);
                    setRole(user.role || '');
                    setName(user.name || '');
                    setFirstname(user.firstname || '');
                    setEmail(user.email || '');
                    setAddress(user.address || '');
                    setCity(user.city || '');
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération de la transaction:', error);
                    setError('Erreur lors de la récupération des données.');
                });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        axios.put(`http://localhost:8000/api/users/${id}`, {
            role,
            name,
            firstname,
            email,
            address,
            city,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log('Compte mise à jour avec succès:', response.data);
                navigate(`/user/${id}`);
            })
            .catch(error => {
                setError(error.response?.data?.message || 'Une erreur est survenue lors de la mise à jour du compte.');
                console.error('Erreur lors de la mise à jour du compte:', error.response?.data || error.message);
            });
    };

    return (
        <div>
            <Picture />
            <div className="flex flex-col items-center mt-20">
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 gap-4 w-3/5 rounded-lg overflow-hidden bg-transparent shadow-lg p-6 border-2 border-[#FBD784]"
                >
                    <h3 className="text-[#FBD784] text-lg mb-4">Modifier vos coordonnées</h3>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            className={`btn ${role === 1 ? 'bg-[#FBD784] text-[#0B1D26]' : 'bg-transparent text-white'} border-[#FBD784]`}
                            onClick={() => setRole(1)}
                            style={{
                                borderColor: '#FBD784',
                                borderRadius: '10px',
                                borderWidth: '2px',
                                borderStyle: 'solid',
                            }}
                        >
                            Consommateur
                        </button>
                        <button
                            type="button"
                            className={`btn ${role === 2 ? 'bg-[#FBD784] text-[#0B1D26]' : 'bg-transparent text-white'} border-[#FBD784]`}
                            onClick={() => setRole(2)}
                            style={{
                                borderColor: '#FBD784',
                                borderRadius: '10px',
                                borderWidth: '2px',
                                borderStyle: 'solid',
                            }}
                        >
                            Producteur
                        </button>
                    </div>

                    <label className="text-white" htmlFor="name">Nom</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input border-[#FBD784] bg-[#0e2631] placeholder:text-white"
                        required
                    />

                    <label className="text-white" htmlFor="firstname">Prénom:</label>
                    <input
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        className="input border-[#FBD784] bg-[#0e2631] placeholder:text-white"
                        required
                    />

                    <label className="text-white" htmlFor="email">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input border-[#FBD784] bg-[#0e2631] placeholder:text-white"
                        required
                    />

                    <label className="text-white" htmlFor="address">Adresse:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="input border-[#FBD784] bg-[#0e2631] placeholder:text-white"
                        required
                    />

                    <label className="text-white" htmlFor="city">Ville:</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="input border-[#FBD784] bg-[#0e2631] placeholder:text-white"
                        required
                    />

                    <div className="flex justify-end space-x-4 mt-4">
                        <Link to={`/user/${id}`} className="btn bg-transparent hover:bg-[#FBD784] text-[#FBD784] hover:text-[#0e2631] border-[#FBD784]">
                            <p>Annuler</p>
                        </Link>
                        {error && <p className="text-red-500">{error}</p>}
                        <button type="submit" className="btn bg-transparent hover:bg-[#FBD784] text-[#FBD784] hover:text-[#0e2631] border-[#FBD784]">Mettre à jour le compte</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
