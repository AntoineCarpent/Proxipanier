import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
                    setError('Impossible de récupérer les informations de l\'utilisateur');
                    setLoading(false);
                });
        } else {
            setError('Aucun token trouvé');
            setLoading(false);
        }
    }, []);

    const handleEdit = () => {
        navigate('/profile/edit');
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer votre profil ?');
        if (confirmDelete) {
            const token = localStorage.getItem('token');
            axios.delete(`http://localhost:8000/api/user/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(() => {
                    localStorage.removeItem('token');
                    navigate('/register');
                })
                .catch(() => {
                    alert('Erreur lors de la suppression du profil');
                });
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
            <div className="flex flex-col items-center mt-20">
                <div className="grid grid-cols-1 gap-4 w-3/5 rounded-lg overflow-hidden bg-transparent shadow-lg p-6 border-2 border-[#FBD784]">
                    <div className="card-body">
                        <h3 className="card-title text-[#FBD784] text-lg">
                            <span className="w-10 h-px bg-[#FBD784] inline-block mr-2"></span>
                            {user?.firstname} {user?.name}
                        </h3>
                        <br />
                        <p style={{ color: '#FFFFFF' }}>
                            <strong>Role:</strong> {user?.role === 1 ? 'Consommateur' : user?.role === 2 ? 'Producteur' : 'Indéfini'}
                        </p>
                        <p style={{ color: '#FFFFFF' }}><strong>Email:</strong> {user?.email}</p>
                        <p style={{ color: '#FFFFFF' }}><strong>Adresse:</strong> {user?.address || 'Non spécifiée'}</p>
                        <p style={{ color: '#FFFFFF' }}><strong>Ville:</strong> {user?.city || 'Non spécifiée'}</p>

                        <div className="card-actions justify-end mt-4">
                            <Link to={`/edit-user/${user.id}`} className="btn hover:text-[#0e2631] text-[#FBD784] hover:bg-[#FBD784] bg-transparent border-[#FBD784] hover:border-none">
                                Modifier le profil
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="btn hover:text-[#f7f0dc] text-[#FF6B6B] hover:bg-[#FF6B6B] bg-transparent border-[#FF6B6B] hover:border-none ml-4"
                            >
                                Supprimer le profil
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
