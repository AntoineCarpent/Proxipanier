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
        <div className="flex flex-col items-center mt-6 px-2 sm:px-4 lg:px-6">
            {salesSheets.length === 0 ? (
                <p className="text-center text-white text-sm sm:text-base">Aucune vente en cours pour ce producteur</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
                    {salesSheets.map((sheet) => (
                        <div
                            className="card bg-transparent w-full border border-[#FBD784] rounded-lg shadow-xl p-2 sm:p-4"
                            key={sheet.id}
                        >
                            <div className="card-body">
                                <h3 className="card-title text-[#FBD784] text-sm sm:text-base">{sheet.product_name}</h3>
                                <p className="text-white text-xs sm:text-sm">Date: {sheet.date}</p>
                                <p className="text-white text-xs sm:text-sm">Horaire: {sheet.start} - {sheet.end}</p>
                                <p className="text-white text-xs sm:text-sm">Adresse: {sheet.address}</p>
                                <p className="text-white text-xs sm:text-sm">Code postal: {sheet.postal_code}</p>
                                <p className="text-white text-xs sm:text-sm">Ville: {sheet.city}</p>
                                <p className="text-white text-xs sm:text-sm">Information:</p>
                                <p className="text-white text-xs sm:text-sm">{sheet.description}</p>

                                {sheet.user_id === userId && (
                                    <div className="card-actions flex justify-end space-x-2 sm:space-x-4 mt-2">
                                        <Link
                                            to={`/edit-sale-sheet/${sheet.id}`}
                                            className="btn hover:text-[#0e2631] text-xs sm:text-sm text-[#FBD784] hover:bg-[#FBD784] bg-transparent border-[#FBD784] hover:border-none"
                                        >
                                            Modifier
                                        </Link>
                                        <button
                                            onClick={() => deleteSalesSheet(sheet.id)}
                                            className="btn hover:text-[#0e2631] text-xs sm:text-sm text-red-500 hover:bg-red-500 bg-transparent border-red-500 hover:border-none"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SalesSheetsList;
