import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const EditUser = ({ userId, onCancel, setUsers }) => {
    const [userData, setUserData] = useState({
        name: '',
        firstname: '',
        email: '',
        password: '',
        address: '',
        city: '',
    });
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:8000/api/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                setUserData({
                    name: response.data.name,
                    firstname: response.data.firstname,
                    email: response.data.email,
                    password: '',
                    address: response.data.address,
                    city: response.data.city,
                });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
            });
    }, [id]);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        axios.put(`http://localhost:8000/api/users/${id}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log('Utilisateur mis à jour avec succès:', response.data);
                setUsers(users => users.map(user => (user.id === userId ? response.data : user)));
                onCancel();
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
            });
    };

    return (
        <div className="flex flex-col items-center mt-20">
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-4 w-3/5 rounded-lg overflow-hidden bg-transparent shadow-lg p-6 border-2 border-[#FBD784]"
            >
                <h3 className="text-[#FBD784] text-lg mb-4">Modifier l'utilisateur</h3>

                <label className="text-white" htmlFor="nom">Nom</label>
                <input
                    type="text"
                    name={userData.name}
                    value={userData.name}
                    onChange={handleChange}
                    className="input border-[#FBD784] bg-[#0e2631] placeholder:text-white"
                    required
                />

                <label className="text-white" htmlFor="prenom">Prénom:</label>
                <input
                    type="text"
                    name="prenom"
                    value={userData.firstname}
                    onChange={handleChange}
                    className="input border-[#FBD784] bg-[#0e2631] placeholder:text-white"
                    required
                />

                <label className="text-white" htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="input border-[#FBD784] bg-[#0e2631] placeholder:text-white"
                    required
                />

                <label className="text-white" htmlFor="mot_de_passe">Mot de passe:</label>
                <input
                    type="password"
                    name="mot_de_passe"
                    value="******"
                    onChange={handleChange}
                    className="input border-[#FBD784] bg-[#0e2631] placeholder:text-white"
                    required
                />

                <label className="text-white" htmlFor="adresse">Adresse:</label>
                <input
                    type="text"
                    name="adresse"
                    value={userData.address}
                    onChange={handleChange}
                    className="input border-[#FBD784] bg-[#0e2631] placeholder:text-white"
                    required
                />

                <label className="text-white" htmlFor="ville">Ville:</label>
                <input
                    type="text"
                    name={userData.city}
                    value={userData.city}
                    onChange={handleChange}
                    className="input border-[#FBD784] bg-[#0e2631] placeholder:text-white"
                    required
                />

                <div className="flex justify-end space-x-4 mt-4">
                    <Link to={`/user/${userData.id}`} className="text-[#FBD784] ml-4">
                        <p>Annuler</p>
                    </Link>
                    <button
                        type="submit"
                        className="btn bg-blue-600 text-white border-none hover:bg-blue-700"
                    >
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;
