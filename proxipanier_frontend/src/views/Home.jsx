import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Map from '../components/Map';
import Picture from '../components/Picture';
import ProducerList from '../components/ProducerList';

const Home = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [producers, setProducers] = useState([]);
    const [postalCode, setPostalCode] = useState(''); // État pour le code postal

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:8000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((userResponse) => {
                    const user = userResponse.data;
                    setUserLocation({
                        lat: user.latitude,
                        lng: user.longitude,
                    });

                    // Récupérer tous les utilisateurs
                    return axios.get('http://localhost:8000/api/users', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                })
                .then((producersResponse) => {
                    // Filtre les utilisateurs pour ne garder que ceux avec le rôle 2 (producteurs)
                    const filteredProducers = producersResponse.data.filter(producer => producer.role === 2);
                    setProducers(filteredProducers); // Met à jour l'état avec les producteurs filtrés
                })
                .catch((error) => {
                    console.error('Erreur lors de la récupération des données:', error);
                });
        }
    }, []);

    // Filtre les producteurs par code postal lorsque le code postal est défini
    const filteredProducers = postalCode
        ? producers.filter(producer => producer.postal_code === postalCode)
        : producers; // Affiche tous les producteurs si aucun code postal n'est spécifié

    return (
        <>
            <div className="mb-10">
                <Picture />
                <ProducerList />
            </div>
            <div className='mr-10 ml-10'>
                <Map userLocation={userLocation} producers={filteredProducers} /> {/* Passe les producteurs filtrés */}
            </div>
        </>
    );
};

export default Home;
