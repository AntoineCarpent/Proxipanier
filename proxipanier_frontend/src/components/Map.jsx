import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import React, { useState } from 'react';

const Map = ({ userLocation, producers }) => {
    const [selectedProducer, setSelectedProducer] = useState(null);

    const mapContainerStyle = {
        width: '100%',
        height: '400px',
    };

    const center = userLocation || { lat: 46.603354, lng: 1.888334 };

    const handleMarkerClick = (producer) => {
        setSelectedProducer(producer);
    };

    const handleInfoWindowClose = () => {
        setSelectedProducer(null);
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyAlqQtweCvJ7uTSsRrhxVk40jdDi9eiWHg">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={5}
            >
                {producers.map((producer) => (
                    <Marker
                        key={producer.id}
                        position={{
                            lat: parseFloat(producer.latitude),
                            lng: parseFloat(producer.longitude),
                        }}
                        title={producer.name}
                        onClick={() => handleMarkerClick(producer)}
                    />
                ))}

                {selectedProducer && (
                    <InfoWindow
                        position={{
                            lat: parseFloat(selectedProducer.latitude),
                            lng: parseFloat(selectedProducer.longitude),
                        }}
                        onCloseClick={handleInfoWindowClose}
                    >
                        <div className='text-black mr-20'>
                            <h2>{selectedProducer.name} {selectedProducer.firstname}</h2>
                            <p>{selectedProducer.address}</p>
                            <p>{selectedProducer.postal_code}</p>
                            <p>{selectedProducer.city}</p>
                            <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedProducer.address)},${encodeURIComponent(selectedProducer.city)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: 'inline-block', background: '#1E90FF', color: '#FFFFFF', borderRadius: '20px' }}
                            >
                                Itinéraire
                            </a>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};
export default Map;
