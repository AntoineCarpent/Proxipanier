import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditUser = () => {
    const [user, setUser] = useState({
        firstname: '',
        name: '',
        email: '',
        address: '',
        city: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:8000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Erreur lors du chargement des informations utilisateur');
                setLoading(false);
            });
        } else {
            setError('Aucun token trouvé');
            setLoading(false);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (token) {
            axios.put(`http://localhost:8000/api/user/${user.id}`, user, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                alert('Profil mis à jour avec succès');
                navigate(`/user/${user.id}`);
            })
            .catch(() => {
                setError('Erreur lors de la mise à jour du profil');
            });
        } else {
            setError('Aucun token trouvé');
        }
    };

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="flex flex-col items-center mt-20">
            <div className="grid grid-cols-1 gap-4 w-3/5 rounded-lg overflow-hidden bg-transparent shadow-lg p-6">
                <h3 className="text-[#FBD784] text-lg mb-4">
                    <span className='w-10 h-px bg-[#FBD784]'></span>Modifier Profil
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="firstname" className="text-white font-semibold">Prénom:</label>
                        <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            value={user.firstname}
                            onChange={handleChange}
                            className="input input-bordered w-full mt-1 bg-transparent text-white rounded-md border-2 border-[#FBD784]"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="text-white font-semibold">Nom:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={user.name}
                            onChange={handleChange}
                            className="input input-bordered w-full mt-1 bg-transparent text-white rounded-md border-2 border-[#FBD784]"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-white font-semibold">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={user.email}
                            onChange={handleChange}
                            className="input input-bordered w-full mt-1 bg-transparent text-white rounded-md border-2 border-[#FBD784]"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="text-white font-semibold">Adresse:</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            value={user.address}
                            onChange={handleChange}
                            className="input input-bordered w-full mt-1 bg-transparent text-white rounded-md border-2 border-[#FBD784]"
                        />
                    </div>
                    <div>
                        <label htmlFor="city" className="text-white font-semibold">Ville:</label>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            value={user.city}
                            onChange={handleChange}
                            className="input input-bordered w-full mt-1 bg-transparent text-white rounded-md border-2 border-[#FBD784]"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="btn bg-transparent text-[#FBD784] border-[#FBD784] hover:bg-[#FBD784] hover:text-[#0e2631] rounded-md"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="btn bg-transparent text-[#FBD784] border-[#FBD784] hover:bg-[#FBD784] hover:text-[#0e2631] rounded-md"
                        >
                            Enregistrer les modifications
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
