import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function ShowProducer() {
    const { id } = useParams();
    const [producer, setProducer] = useState(null);
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`http://localhost:8000/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    setProducer(response.data);
                    return axios.get('http://localhost:8000/api/salesSheets', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                })
                .then(response => {
                    setSales(response.data.filter(sale => sale.user_id === parseInt(id)));
                    setLoading(false);
                })
                .catch(() => {
                    setError('Échec du chargement du producteur ou des fiches de vente');
                    setLoading(false);
                });
        } else {
            setError('Aucun token trouvé');
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <div>
            </div>
            <div className="flex flex-col items-center mt-20">
                <div className="grid grid-cols-1 gap-4 w-3/5 rounded-lg overflow-hidden">

                    {/* Producer Info */}
                    <div className="flex bg-transparent w-full rounded-[10px] shadow-lg p-4 border-2 border-[#FBD784]">
                        <div className="card-body">
                            <h3 className="card-title text-[#FBD784] text-lg">
                                <span className="w-10 h-px bg-[#FBD784]"></span>{producer?.firstname} {producer?.name}
                            </h3>
                            <br />
                            <p style={{ color: '#FFFFFF' }}><strong>Email:</strong> {producer?.email}</p>
                            <p style={{ color: '#FFFFFF' }}><strong>Adresse:</strong> {producer?.address || 'Non spécifiée'}</p>
                            <p style={{ color: '#FFFFFF' }}><strong>Ville:</strong> {producer?.city || 'Non spécifiée'}</p>
                        </div>
                    </div>

                    {/* Sales Info */}
                    <div className="bg-transparent w-full rounded-[10px] shadow-lg p-4 mt-4 border-2 border-[#FBD784]">
                        <ul>
                            {sales.length > 0 ? (
                                sales.map(sale => (
                                    <li key={sale.id} className="border-b py-2">
                                        <h3 className="card-title text-lg text-[#FBD784]">{sale.product_name}</h3>
                                        <p style={{ color: '#FFFFFF' }}><strong>Date:</strong> {new Date(sale.date).toLocaleDateString()}</p>
                                        <p style={{ color: '#FFFFFF' }}><strong>Horaire:</strong> De {sale.start} à {sale.end}</p>
                                        <p style={{ color: '#FFFFFF' }}><strong>Lieu:</strong> {sale.address}, {sale.city}</p>
                                        <p style={{ color: '#FFFFFF' }}><strong>Informations supplémentaires:</strong> {sale.description}</p>
                                    </li>
                                ))
                            ) : (
                                <li style={{ color: '#FFFFFF' }}>Aucune fiche de vente enregistrée.</li>
                            )}
                        </ul>
                    </div>

                    {/* Back Button */}
                    <div className="mt-4">
                        <Link to="/" className="btn hover:text-[#0e2631] text-[#FBD784] hover:bg-[#FBD784] bg-transparent border-[#FBD784] hover:border-none">
                            Retour à la liste des producteurs
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowProducer;
