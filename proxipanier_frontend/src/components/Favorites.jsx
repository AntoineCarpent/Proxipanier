import React from 'react';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://proxipanier.onrender.com/api/user/favorites', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFavorites(response.data);
        };
        fetchFavorites();
    }, []);

    return (
        <div>
            <h1>Favoris</h1>
            {favorites.map((producerId) => (
                <ProducerCard key={producerId} producerId={producerId} />
            ))}
        </div>
    );
};

export default Favorites;