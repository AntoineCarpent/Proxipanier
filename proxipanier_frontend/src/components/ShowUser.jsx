import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Picture from './Picture';
import ProducerList from './ProducerList';

const ShowUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');

        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            const parsedFavorites = JSON.parse(savedFavorites);
            console.log('parsedFavorites :', parsedFavorites);
            setFavorites(parsedFavorites);
        }



        if (token) {
            axios.get(`https://proxipanier.onrender.com/api/users/${id}`, {
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

        axios.delete(`https://proxipanier.onrender.com/api/users/${id}`, {
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
    const toggleFavorite = async (producerId) => {
        const token = localStorage.getItem('token');
        try {
            let newFavorites;
            if (favorites.some(fav => fav.producer_id === producerId)) {
                await axios.delete(`https://proxipanier.onrender.com/api/user/favorites/${producerId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                newFavorites = favorites.filter(fav => fav.producer_id !== producerId);
            } else {
                await axios.post('https://proxipanier.onrender.com/api/user/favorites', { producerId }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                newFavorites = [...favorites, { producer_id: producerId }];
            }
            setFavorites(newFavorites);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        } catch (error) {
            console.error('Error toggling favorite:', error);
            setError('Failed to update favorites.');
        }
    };

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    return (
        <div>
            <Picture />
            <div className="flex flex-col items-center mt-20">
                <div className="grid grid-cols-1 w-4/5 rounded-lg overflow-hidden bg-transparent shadow-lg p-6 border-2 border-[#FBD784]">
                    <div className="card-body">
                        <h3 className="card-title text-[#FBD784] text-lg">
                            <span className='w-10 h-px bg-[#FBD784]'></span>{user.name || 'Nom non spécifié'} {user.firstname || 'Nom non spécifié'}
                        </h3>
                        <p style={{ color: '#FFFFFF' }}>
                            <strong>Statut: </strong>
                            {user.role === 1 ? 'Consommateur' : user.role === 2 ? 'Producteur' : 'Non spécifié'}
                        </p>
                        <p style={{ color: '#FFFFFF' }}><strong>Mail:</strong> {user.email || 'Non spécifiée'}</p>

                        {user.role !== 1 && (
                            <>
                                <p style={{ color: '#FFFFFF' }}><strong>Téléphone:</strong> {user.phone_number || 'Non spécifiée'}</p>
                                <p style={{ color: '#FFFFFF' }}><strong>Adresse:</strong> {user.address || 'Non spécifiée'}</p>
                            </>
                        )}

                        <p style={{ color: '#FFFFFF' }}><strong>Code postal:</strong> {user.postal_code || 'Non spécifiée'}</p>
                        <p style={{ color: '#FFFFFF' }}><strong>Ville:</strong> {user.city || 'Non spécifiée'}</p>

                        <div className="card-actions justify-end mt-4">
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
                <div className="mt-6 w-4/5">
                    <h2 className="text-[#FBD784] text-xl text-center mb-4">Vos producteurs favoris</h2>
                    {favorites.length > 0 ? (
                        <ProducerList favorites={favorites} />
                    ) : (
                        <p>Aucun producteur favori.</p>
                    )}
                </div>

            </div>
        </div >
    );
};

export default ShowUser;
