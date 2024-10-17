import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'https://book-website-backend.vercel.app',
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default axiosInstance;
