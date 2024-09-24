import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ProducerList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:8000/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    role: 2,
                },
            })
                .then(response => {
                    console.log('Users retrieved:', response.data);
                    setUsers(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError('Failed to fetch users');
                    console.error('Error fetching users:', error.response ? error.response.data : error.message);
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
                    {users.map((user) => (
                        <div
                            className="card bg-transparent w-full border border-[#FBD784] rounded-lg shadow-xl"
                            key={user.id}
                            style={{ borderRadius: '10px', borderWidth: '2px' }}
                        >
                            <div className="card-body">
                                <h3 className="card-title" style={{ color: '#FFFFFF' }}>{user.nom}</h3>
                                <p style={{ color: '#FFFFFF' }}>Email: {user.email}</p>
                                <p style={{ color: '#FFFFFF' }}>Rôle: Utilisateur</p>
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
export default ProducerList;
