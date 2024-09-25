import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ShowUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`http://localhost:8000/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to fetch user data');
                setLoading(false);
            });
        } else {
            setError('No authentication token found');
            setLoading(false);
        }
    }, [id]);

    const handleDelete = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError('No authentication token found');
            return;
        }

        axios.delete(`http://localhost:8000/api/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => {
            alert('User deleted successfully');
            navigate('/register');
        })
        .catch(error => {
            console.error('Error deleting user:', error.response || error.message);
            setError('Failed to delete user');
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="flex flex-col items-center mt-20">
            <div className="grid grid-cols-1 w-4/5 rounded-lg overflow-hidden bg-transparent shadow-lg p-6 border-2 border-[#FBD784]">
                <div className="card-body">
                    <h3 className="card-title text-[#FBD784] text-lg">
                        <span className='w-10 h-px bg-[#FBD784]'></span>{user.name}
                    </h3>
                    <p style={{ color: '#FFFFFF' }}><strong>Ville:</strong> {user.city || 'Non spécifiée'}</p>
                    <div className="card-actions justify-end mt-4">
                        <Link to={`/edit-user/${user.id}`} className="btn hover:text-[#0e2631] text-[#FBD784] hover:bg-[#FBD784] bg-transparent border-[#FBD784] hover:border-none">
                            Modifier
                        </Link>
                        <button onClick={handleDelete} className="btn bg-red-600 text-white hover:bg-red-700 border-none">
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowUser;
