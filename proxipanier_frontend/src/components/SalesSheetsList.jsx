import axios from 'axios';
import React, { useEffect, useState } from 'react';

function SalesSheetsList() {
    const [salesSheets, setSalesSheets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:8000/api/salesSheets', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    console.log('Sales sheets retrieved:', response.data);
                    const sortedSalesSheets = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
                    setSalesSheets(sortedSalesSheets);
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
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <div>
                <div
                    className="w-full h-96 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/principale.jpg')" }}
                ></div>
            </div>
            <div className="flex flex-col items-center mt-20">
                <div className="grid grid-cols-1 gap-6 w-3/4">
                    {salesSheets.map((sheet) => (
                        <div
                            className="card bg-base-100 w-full border border-[#FBD784] rounded-lg shadow-xl"
                            key={sheet.id}
                            style={{ borderRadius: '10px', borderWidth: '2px' }}
                        >
                            <div className="card-body">
                                <h3 className="card-title" style={{ color: '#FFFFFF' }}>{sheet.product_name}</h3>
                                <p style={{ color: '#FFFFFF' }}>Horaire: {sheet.start} - {sheet.end}</p>
                                <p style={{ color: '#FFFFFF' }}>Adresse: {sheet.address}</p>
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
