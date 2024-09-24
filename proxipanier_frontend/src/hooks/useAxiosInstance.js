import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAxiosInstance = () => {
    const navigate = useNavigate();

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8000/api',
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {

                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                navigate('/login');
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default useAxiosInstance;
