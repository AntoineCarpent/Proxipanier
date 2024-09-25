import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProducerList() {
    const [users, setUsers] = useState([]);
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            Promise.all([
                axios.get('http://localhost:8000/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        role: 2,
                    },
                }),
                axios.get('http://localhost:8000/api/salesSheets', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }),
            ])
                .then(([usersResponse, salesResponse]) => {
                    setUsers(usersResponse.data);
                    setSales(salesResponse.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError('Failed to fetch users or sales');
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
            <div className="flex flex-col items-center mt-20">
                <div className="grid grid-cols-3 gap-4 w-4/5 rounded-lg overflow-hidden">
                    {users.map((user, index) => {
                        const userSales = sales.filter(sale => sale.user_id === user.id);
                        const salesNames = userSales.length > 0
                            ? userSales.map(sale => sale.product_name).join(', ')
                            : 'aucune vente en cour';

                        return (
                            <div
                                key={user.id}
                                className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} bg-transparent w-full rounded-[10px] shadow-lg p-4 border-2 border-[#FBD784]`}
                            >
                                <div className="card-body">
                                    <h3 className="card-title text-[#FBD784] text-lg">
                                        <span className='w-10 h-px bg-[#FBD784]'></span>{user.name}
                                    </h3>
                                    <br />
                                    <p style={{ color: '#FFFFFF' }}>Ville: {user.city || 'Non spécifiée'}</p>
                                    <p style={{ color: '#FFFFFF' }}>
                                        Ventes actuel: {salesNames}
                                    </p>
                                    <div className="card-actions justify-end">
                                        <Link to={`/producers/${user.id}`} className="btn hover:text-[#0e2631] text-[#FBD784] hover:bg-[#FBD784] bg-transparent border-[#FBD784] hover:border-none">
                                            Voir plus
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProducerList;
