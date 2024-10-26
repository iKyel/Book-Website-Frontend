import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? 'https://book-website-backend.vercel.app'  // URL cho môi trường production
        : 'http://localhost:3000',       // URL cho môi trường development
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && (error.response.status === 500 || error.response.status === 404) && typeof error.response.data === 'object') {
            alert(error.response.data.message || "Có lỗi xảy ra (404 | 500)");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
