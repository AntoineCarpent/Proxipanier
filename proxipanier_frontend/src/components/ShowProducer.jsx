import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Picture from './Picture';
import SalesSheetsList from './SalesSheetsList';

const ShowProducer = () => {
    const { id } = useParams();
    const [producer, setProducer] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const currentUserId = localStorage.getItem('id');
        setUserRole(role);
        setUserId(currentUserId);

        if (token) {
            axios.get(`http://localhost:8000/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    setProducer(response.data);
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

    const handleDelete = (id) => {
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
                navigate("/register")
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
        <div>
            <Picture />
            <div className="flex flex-col items-center mt-10 sm:mt-16 px-4 sm:px-6 lg:px-8">
                <div key={producer.id} className="grid grid-cols-1 w-full sm:w-3/4 lg:w-2/3 rounded-lg overflow-hidden bg-transparent shadow-lg p-4 sm:p-6 border-2 border-[#FBD784] mt-4">
                    <div className="card-body">
                        <h3 className="card-title text-[#FBD784] text-base sm:text-lg mb-4">
                            <span className="block w-12 h-px bg-[#FBD784] mb-2"></span>
                            {producer.name || 'Nom non spécifié'} {producer.firstname || 'Nom non spécifié'}
                        </h3>
                        <p className="text-white text-sm sm:text-base mb-2">
                            <strong>Statut: </strong>
                            {producer.role === 1 ? 'Consommateur' : producer.role === 2 ? 'Producteur' : 'Non spécifié'}
                        </p>
                        <p className="text-white text-sm sm:text-base mb-2"><strong>Mail:</strong> {producer.email || 'Non spécifiée'}</p>
                        <p className="text-white text-sm sm:text-base mb-2"><strong>Téléphone:</strong> {producer.phone_number || 'Non spécifiée'}</p>
                        <p className="text-white text-sm sm:text-base mb-2"><strong>Adresse:</strong> {producer.address || 'Non spécifiée'}</p>
                        <p className="text-white text-sm sm:text-base mb-2"><strong>Code postal:</strong> {producer.postal_code || 'Non spécifiée'}</p>
                        <p className="text-white text-sm sm:text-base mb-2"><strong>Ville:</strong> {producer.city || 'Non spécifiée'}</p>

                        {/* Affichage conditionnel basé sur le rôle et l'ID */}
                        {userRole === '2' && userId === String(producer.id) && (
                            <div className="mt-4 sm:mt-6">
                                <div className="card-actions flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                                    <Link
                                        to={`/edit-user/${producer.id}`}
                                        className="btn hover:text-[#0e2631] text-xs sm:text-sm text-[#FBD784] hover:bg-[#FBD784] bg-transparent border-[#FBD784] hover:border-none"
                                    >
                                        Modifier
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(producer.id)}
                                        className="btn bg-red-600 text-xs sm:text-sm text-white hover:bg-red-700 border-none"
                                        aria-label="Supprimer l'utilisateur"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="mt-6 w-full">
                            <h2 className="text-[#FBD784] text-lg sm:text-xl text-center mb-4">Fiches de ventes</h2>
                            {userRole === '2' && userId === String(producer.id) && (
                                <div className="card-actions justify-start items-center mb-4">
                                    <Link to={`/add-sale-sheet/${producer.id}`} className="btn hover:text-[#0e2631] text-xs sm:text-sm text-[#FBD784] hover:bg-[#FBD784] bg-transparent border-[#FBD784] hover:border-none">
                                        Ajouter une fiche de vente
                                    </Link>
                                </div>
                            )}
                            <SalesSheetsList producerId={producer.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowProducer;
