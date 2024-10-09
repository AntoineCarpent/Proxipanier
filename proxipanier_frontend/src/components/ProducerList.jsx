import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

function ProducerList() {
    const [users, setUsers] = useState([]);
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [distanceLimit, setDistanceLimit] = useState(10);
    const [favorites, setFavorites] = useState([]);
    const [id, setId] = useState([]);
    const [role, setRole] = useState([]);

    const haversineDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        setId(id);
        const role = localStorage.getItem('role');
        setRole(role);
        const savedFavorites = localStorage.getItem('favorites');

        if (savedFavorites) {
            const parsedFavorites = JSON.parse(savedFavorites);
            setFavorites(parsedFavorites);
        }
        if (token) {
            axios.get('http://localhost:8000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(userResponse => {
                    const user = userResponse.data;
                    setUserLocation({
                        lat: user.latitude,
                        lng: user.longitude,
                    });

                    return Promise.all([
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
                        axios.get('http://localhost:8000/api/user/favorites', {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }),
                    ]);
                })
                .then(([usersResponse, salesResponse, favoritesResponse]) => {
                    const producers = usersResponse.data.filter(user => user.role === 2);
                    setUsers(producers);
                    setSales(salesResponse.data);

                    const favoritesArray = Array.isArray(favoritesResponse.data)
                        ? favoritesResponse.data
                        : [];
                    setFavorites(favoritesArray);
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

    const toggleFavorite = async (producerId) => {
        const token = localStorage.getItem('token');
        try {
            let newFavorites;
            if (favorites.some(fav => fav.producer_id === producerId)) {
                await axios.delete(`http://localhost:8000/api/user/favorites/${producerId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                newFavorites = favorites.filter(fav => fav.producer_id !== producerId);
            } else {
                await axios.post('http://localhost:8000/api/user/favorites', { producerId }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                newFavorites = [...favorites, { producer_id: producerId }];
            }
            setFavorites(newFavorites);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        } catch (error) {
            console.error('Error toggling favorite:', error);
            setError('Failed to update favorites.');
        }
    };

    const filteredProducers = userLocation
        ? users.filter(user => {
            const userLat = user.latitude;
            const userLng = user.longitude;
            if (userLat && userLng) {
                const distance = haversineDistance(userLocation.lat, userLocation.lng, userLat, userLng);
                return distance <= distanceLimit;
            }
            return false;
        })
        : users;

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <div className="flex flex-col items-center mt-20">
                <div className="mb-4 w-72">
                    <label htmlFor="distanceRange" className="text-[#FBD784] mb-2 block text-sm">Distance de recherche</label>
                    <input
                        id="distanceRange"
                        type="range"
                        min={0}
                        max={50}
                        step={10}
                        value={distanceLimit}
                        onChange={(e) => setDistanceLimit(Number(e.target.value))}
                        className="w-full h-4 bg-[#FBD784] rounded-lg appearance-none cursor-pointer"
                        style={{
                            background: `#FBD784`,
                        }}
                    />
                    <div className="flex w-full justify-between px-2 text-xs text-[#FBD784]">
                        <span>0 km</span>
                        <span>10 km</span>
                        <span>20 km</span>
                        <span>30 km</span>
                        <span>40 km</span>
                        <span>50 km</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 w-4/5 rounded-lg overflow-hidden">
                    {filteredProducers.length > 0 ? (
                        filteredProducers.map((user, index) => {
                            const userSales = sales.filter(sale => sale.user_id === user.id);
                            const salesNames = userSales.length > 0
                                ? userSales.map(sale => sale.product_name).join(', ')
                                : 'aucune vente en cours';

                            return (
                                <div
                                    key={user.id}
                                    className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} bg-transparent w-full rounded-[10px] shadow-lg p-4 border-2 border-[#FBD784] relative`}
                                >
                                    <div className="card-body">
                                        <h3 className="card-title text-[#FBD784] text-lg">
                                            <span className='w-10 h-px bg-[#FBD784]'></span>{user.name}
                                        </h3>
                                        <br />
                                        <p style={{ color: '#FFFFFF' }}>Ville: {user.city || 'Non spécifiée'}</p>
                                        <p style={{ color: '#FFFFFF' }}>
                                            Ventes actuelles: {salesNames}
                                        </p>
                                        <div className="card-actions justify-end items-center">
                                            <Link to={`/producer/${user.id}`} className="btn hover:text-[#0e2631] text-[#FBD784] hover:bg-[#FBD784] bg-transparent border-[#FBD784] hover:border-none">
                                                Voir plus
                                            </Link>
                                            {id !== user.id && role !== 2 ? (
                                                <div className="absolute top-2 right-2 flex items-center">
                                                    <FontAwesomeIcon
                                                        icon={favorites.some(fav => fav.producer_id === user.id) ? solidHeart : regularHeart}
                                                        onClick={() => toggleFavorite(user.id)}
                                                        className="h-5 w-5 cursor-pointer text-[#FBD784]"
                                                    />
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p style={{ color: '#FFFFFF' }}>Aucun producteur disponible dans un rayon de {distanceLimit} km.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProducerList;
