import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SalesSheetsList() {
    const { id } = useParams();
    const [salesSheets, setSalesSheets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`http://localhost:8000/api/salesSheets/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    console.log('Sales sheets retrieved:', response.data);
                    // Check if the data is an array
                    const data = response.data.salesSheets || []; // Adjust if necessary
                    if (Array.isArray(data)) {
                        const sortedSalesSheets = data.sort((a, b) => new Date(a.date) - new Date(b.date));
                        setSalesSheets(sortedSalesSheets);
                    } else {
                        setError('Sales sheets data is not an array');
                    }
                    setLoading(false);
                })
                .catch(error => {
                    setError('Failed to fetch sales sheets');
                    console.error('Error fetching sales sheets:', error.response ? error.response.data : error.message);
                    setLoading(false);
                });
        } else {
            setError('No authentication token found');
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <div>
            </div>
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
        </div>
    );
}

export default SalesSheetsList;
