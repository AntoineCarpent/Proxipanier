import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SalesSheetsList = ({ userId }) => {
    const [salesSheets, setSalesSheets] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSalesSheets = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8000/api/salesSheets`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        user_id: userId,
                    },
                });

                setSalesSheets(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des fiches de vente:', error);
                setError('Erreur lors de la récupération des fiches de vente.');
            }
        };

        if (userId) {
            fetchSalesSheets();
        }
    }, [userId]);

    if (error) {
        return <div>{error}</div>;
    }

    if (salesSheets.length === 0) {
        return <div>Aucune fiche de vente disponible pour cet utilisateur.</div>;
    }

    return (
        <div>
            {salesSheets.length === 0 ? (
                <p className="text-center text-white">Vous n'avez aucune vente en cours</p>
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
                                <p style={{ color: '#FFFFFF' }}>Déscription:</p>
                                <p style={{ color: '#FFFFFF' }}>{sheet.description}</p>
                                <div className="card-actions justify-end">
                                </div>
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
