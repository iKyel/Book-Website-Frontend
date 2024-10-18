import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'https://book-website-backend.vercel.app',
    baseURL: 'http://localhost:3000',
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
        if (error.response && error.response.status === 500) {
            alert("Có lỗi xảy ra bên máy chủ");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
