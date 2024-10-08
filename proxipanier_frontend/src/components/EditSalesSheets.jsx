import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Picture from './Picture';

const EditSalesSheets = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [date, setDate] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchSalesSheet = async () => {
            if (id && token) {
                const response = await axios.get(`http://localhost:8000/api/salesSheets/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const sheet = response.data;

                setProductName(sheet.product_name);
                setDate(sheet.date);
                setStart(sheet.start);
                setEnd(sheet.end);
                setPrice(sheet.price);
                setAddress(sheet.address);
                setPostalCode(sheet.postal_code);
                setCity(sheet.city);
                setDescription(sheet.description);
            }
        };

        fetchSalesSheet();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token');
    
        const formattedStart = moment(start, "HH:mm").format("HH:mm");
        const formattedEnd = moment(end, "HH:mm").format("HH:mm");
    
        const response = await axios.put(
            `http://localhost:8000/api/salesSheets/${id}`,
            {
                product_name: productName,
                date,
                start: formattedStart, // Utilise les heures formatées ici
                end: formattedEnd,
                price,
                address,
                postal_code: postalCode,
                city,
                description,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    
        navigate(`/producer/${id}`);
    };
    
    
    return (
        <div>
            <Picture />
            <div className="flex items-center justify-center min-h-[70vh] mt-20" style={{ backgroundColor: '#0e2631' }}>
                <div
                    className="w-full max-w-md md:w-2/5 p-8 rounded-lg shadow-lg"
                    style={{
                        backgroundColor: '#0e2631',
                        border: '1px solid #FBD784',
                        borderRadius: '10px',
                    }}
                >
                    <h1 className="text-2xl font-bold text-center mb-6" style={{ color: '#FFFFFF' }}>
                        Modifier la Fiche de Vente
                    </h1>

                    {error && <p className="text-red-500">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="text"
                                className="grow bg-transparent p-2 outline-none"
                                placeholder="Nom du produit"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                required
                                style={{
                                    color: '#FFFFFF',
                                    borderColor: '#FBD784',
                                    borderRadius: '10px',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                }}
                            />
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="date"
                                className="grow bg-transparent p-2 outline-none"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                style={{
                                    color: '#FFFFFF',
                                    borderColor: '#FBD784',
                                    borderRadius: '10px',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                }}
                            />
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="time"
                                className="grow bg-transparent p-2 outline-none"
                                placeholder="Heure de début"
                                value={start}
                                onChange={(e) => setStart(e.target.value)}
                                required
                                pattern="[0-9]{2}:[0-9]{2}"
                                style={{
                                    color: '#FFFFFF',
                                    borderColor: '#FBD784',
                                    borderRadius: '10px',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                }}
                            />
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="time"
                                className="grow bg-transparent p-2 outline-none"
                                placeholder="Heure de fin"
                                value={end}
                                onChange={(e) => setEnd(e.target.value)}
                                required
                                pattern="[0-9]{2}:[0-9]{2}"
                                style={{
                                    color: '#FFFFFF',
                                    borderColor: '#FBD784',
                                    borderRadius: '10px',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                }}
                            />
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="text"
                                className="grow bg-transparent p-2 outline-none"
                                placeholder="Prix /kg"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                style={{
                                    color: '#FFFFFF',
                                    borderColor: '#FBD784',
                                    borderRadius: '10px',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                }}
                            />
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="text"
                                className="grow bg-transparent p-2 outline-none"
                                placeholder="Adresse"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                style={{
                                    color: '#FFFFFF',
                                    borderColor: '#FBD784',
                                    borderRadius: '10px',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                }}
                            />
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="text"
                                className="grow bg-transparent p-2 outline-none"
                                placeholder="Code postal"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                                style={{
                                    color: '#FFFFFF',
                                    borderColor: '#FBD784',
                                    borderRadius: '10px',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                }}
                            />
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="text"
                                className="grow bg-transparent p-2 outline-none"
                                placeholder="Ville"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                style={{
                                    color: '#FFFFFF',
                                    borderColor: '#FBD784',
                                    borderRadius: '10px',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                }}
                            />
                        </label>

                        <label className="flex items-center gap-2">
                            <textarea
                                className="grow bg-transparent p-2 outline-none"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{
                                    color: '#FFFFFF',
                                    borderColor: '#FBD784',
                                    borderRadius: '10px',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                }}
                            />
                        </label>

                        <button
                            type="submit"
                            className="btn w-full"
                            style={{
                                backgroundColor: '#FBD784',
                                color: '#0e2631',
                                border: '2px solid #FBD784',
                                borderRadius: '10px',
                            }}
                        >
                            Mettre à jour la fiche
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditSalesSheets;
