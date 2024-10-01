import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Picture from './Picture';
import SalesSheetsList from './SalesSheetsList';

const ShowProducer = () => {
    const { id } = useParams(); // ID de l'utilisateur affiché
    const [producer, setProducer] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);

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
                // Redirection ou autre action après suppression
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
            <div className="flex flex-col items-center mt-20">
                <div key={producer.id} className="grid grid-cols-1 w-4/5 rounded-lg overflow-hidden bg-transparent shadow-lg p-6 border-2 border-[#FBD784] mt-4">
                    <div className="card-body">
                        <h3 className="card-title text-[#FBD784] text-lg">
                            <span className='w-10 h-px bg-[#FBD784]'></span> {producer.name || 'Nom non spécifié'} {producer.firstname || 'Nom non spécifié'}
                        </h3>
                        <p style={{ color: '#FFFFFF' }}>
                            <strong>Statut: </strong>
                            {producer.role === 1 ? 'Consommateur' : producer.role === 2 ? 'Producteur' : 'Non spécifié'}
                        </p>
                        <p style={{ color: '#FFFFFF' }}><strong>Mail:</strong> {producer.email || 'Non spécifiée'}</p>
                        <p style={{ color: '#FFFFFF' }}><strong>Téléphone:</strong> {producer.phone_number || 'Non spécifiée'}</p>
                        <p style={{ color: '#FFFFFF' }}><strong>Adresse:</strong> {producer.address || 'Non spécifiée'}</p>
                        <p style={{ color: '#FFFFFF' }}><strong>Code postal:</strong> {producer.postal_code || 'Non spécifiée'}</p>
                        <p style={{ color: '#FFFFFF' }}><strong>Ville:</strong> {producer.city || 'Non spécifiée'}</p>

                        {/* Affichage conditionnel basé sur le rôle et l'ID */}
                        {userRole === '2' && userId === String(producer.id) && (
                            <div>
                                <div className="card-actions justify-end mt-4">
                                    <Link
                                        to={`/edit-user/${producer.id}`}
                                        className="btn hover:text-[#0e2631] text-[#FBD784] hover:bg-[#FBD784] bg-transparent border-[#FBD784] hover:border-none"
                                    >
                                        Modifier
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(producer.id)}
                                        className="btn bg-red-600 text-white hover:bg-red-700 border-none"
                                        aria-label="Supprimer l'utilisateur"
                                    >
                                        Supprimer
                                    </button>
                                </div>

                                <div className="mt-6 w-full">
                                    <div className="card-actions justify-start items-center">
                                        
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-6 w-full">
                            <h2 className="text-[#FBD784] text-xl text-center mb-4">Fiches de ventes</h2>
                            <SalesSheetsList userId={producer.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowProducer;
