import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Picture from './Picture';

const ShowUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id');
        if (token) {
            axios.get(`http://localhost:8000/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    setUser(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    setError('Erreur lors de la récupération des informations utilisateur.');
                    setLoading(false);
                });
        } else {
            setError('Token d\'authentification introuvable.');
            setLoading(false);
        }
    }, [id]);

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Token d\'authentification introuvable.');
            return;
        }

        axios.delete(`http://localhost:8000/api/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                alert('Utilisateur supprimé avec succès.');
                navigate('/register');
            })
            .catch(error => {
                console.error('Erreur lors de la suppression de l\'utilisateur:', error.response || error.message);
                setError('Erreur lors de la suppression de l\'utilisateur.');
            });
    };

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="min-h-screen bg-[#0e2631]">
            <Picture />
            <div className="flex flex-col items-center mt-10 lg:mt-20">
                <div className="grid grid-cols-1 w-full md:w-4/5 lg:w-3/5 rounded-lg overflow-hidden bg-transparent shadow-lg p-6 border-2 border-[#FBD784]">
                    <div className="card-body">
                        <h3 className="card-title text-[#FBD784] text-lg">
                            <span className='w-10 h-px bg-[#FBD784]'></span>{user.name || 'Nom non spécifié'} {user.firstname || 'Nom non spécifié'}
                        </h3>
                        <p className="text-white">
                            <strong>Statut: </strong>
                            {user.role === 1 ? 'Consommateur' : user.role === 2 ? 'Producteur' : 'Non spécifié'}
                        </p>
                        <p className="text-white"><strong>Mail:</strong> {user.email || 'Non spécifiée'}</p>

                        {user.role !== 1 && (
                            <>
                                <p className="text-white"><strong>Téléphone:</strong> {user.phone_number || 'Non spécifiée'}</p>
                                <p className="text-white"><strong>Adresse:</strong> {user.address || 'Non spécifiée'}</p>
                            </>
                        )}

                        <p className="text-white"><strong>Code postal:</strong> {user.postal_code || 'Non spécifiée'}</p>
                        <p className="text-white"><strong>Ville:</strong> {user.city || 'Non spécifiée'}</p>

                        <div className="card-actions justify-end mt-4 space-x-4">
                            <Link
                                to={`/edit-user/${user.id}`}
                                className="btn hover:text-[#0e2631] text-[#FBD784] hover:bg-[#FBD784] bg-transparent border-[#FBD784] hover:border-none"
                            >
                                Modifier
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="btn bg-red-600 text-white hover:bg-red-700 border-none"
                                aria-label="Supprimer l'utilisateur"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>

                {user.role === 1 && user.postal_code && (
                    <div className="mt-6 w-full md:w-4/5 lg:w-3/5">
                        <h2 className="text-[#FBD784] text-xl text-center mb-4">Vos producteurs favoris</h2>
                        <div className="card-actions justify-start items-center">
                            {/* Liste des favoris */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowUser;
