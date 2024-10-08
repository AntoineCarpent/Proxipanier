import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SalesSheetsList = ({ producerId }) => {
    const [salesSheets, setSalesSheets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const currentUserId = parseInt(localStorage.getItem('id'));
        setUserId(currentUserId);

        if (token) {
            axios.get('http://localhost:8000/api/salesSheets', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    const filteredSalesSheets = response.data.filter(sheet => sheet.user_id === producerId);
                    setSalesSheets(filteredSalesSheets);
                    setLoading(false);
                })
                .catch(() => {
                    setError('Erreur lors de la récupération des fiches de vente.');
                    setLoading(false);
                });
        } else {
            setError('Token d\'authentification introuvable.');
            setLoading(false);
        }
    }, [producerId]);

    const deleteSalesSheet = (sheetId) => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.delete(`http://localhost:8000/api/salesSheets/${sheetId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(() => {
                    setSalesSheets(salesSheets.filter(sheet => sheet.id !== sheetId));
                })
                .catch(() => {
                    setError('Erreur lors de la suppression de la fiche de vente.');
                });
        } else {
            setError('Token d\'authentification introuvable.');
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
            {salesSheets.length === 0 ? (
                <p className="text-center text-white">Aucune vente en cours pour ce producteur</p>
            ) : (
                <div className="flex flex-col items-center mt-20">
                    <div className="grid grid-cols-1 gap-6 w-3/4">
                        {salesSheets.map((sheet) => (
                            <div
                                className="card bg-transparent w-full border border-[#FBD784] rounded-lg shadow-xl"
                                key={sheet.id}
                                style={{ borderRadius: '10px', borderWidth: '2px' }}
                            >
                                <div className="card-body">
                                    <h3 className="card-title" style={{ color: '#FFFFFF' }}>{sheet.product_name}</h3>
                                    <p style={{ color: '#FFFFFF' }}>Date: {sheet.date}</p>
                                    <p style={{ color: '#FFFFFF' }}>Horaire: {sheet.start} - {sheet.end}</p>
                                    <p style={{ color: '#FFFFFF' }}>Adresse: {sheet.address}</p>
                                    <p style={{ color: '#FFFFFF' }}>Code postal: {sheet.postal_code}</p>
                                    <p style={{ color: '#FFFFFF' }}>Ville: {sheet.city}</p>
                                    <p style={{ color: '#FFFFFF' }}>Information:</p>
                                    <p style={{ color: '#FFFFFF' }}>{sheet.description}</p>

                                    {sheet.user_id === userId && (
                                        <div className="card-actions justify-end">
                                            <Link
                                                to={`/edit-sale-sheet/${sheet.id}`}
                                                className="btn hover:text-[#0e2631] text-[#FBD784] hover:bg-[#FBD784] bg-transparent border-[#FBD784] hover:border-none"
                                            >
                                                Modifier
                                            </Link>
                                            <button
                                                onClick={() => deleteSalesSheet(sheet.id)}
                                                className="btn hover:text-[#0e2631] text-red-500 hover:bg-red-500 bg-transparent border-red-500 hover:border-none ml-4"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SalesSheetsList;
