import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Map from '../components/Map';
import Picture from '../components/Picture';
import ProducerList from '../components/ProducerList';

const Home = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [producers, setProducers] = useState([]);
    const [postalCode, setPostalCode] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('https://proxipanier.onrender.com/api/user', {
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

                    return axios.get('https://proxipanier.onrender.com/api/users', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                })
                .then((producersResponse) => {
                    const filteredProducers = producersResponse.data.filter(producer => producer.role === 2);
                    setProducers(filteredProducers);
                })
                .catch((error) => {
                    console.error('Erreur lors de la récupération des données:', error);
                });
        }
    }, []);

    const filteredProducers = postalCode
        ? producers.filter(producer => producer.postal_code === postalCode)
        : producers;

    return (
        <>
            <div className="mb-10 flex flex-col items-center">
                <Picture />
                <div className="w-full md:w-4/5 lg:w-3/5 mt-6">
                    <ProducerList producers={filteredProducers} />
                </div>
            </div>
            <div className='mr-10 ml-10'>
                <Map userLocation={userLocation} producers={filteredProducers} />
            </div>
        </>
    );
};

export default Home;
