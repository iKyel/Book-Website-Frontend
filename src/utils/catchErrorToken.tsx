import axios from 'axios';
import { destroyCookie } from 'nookies';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? 'https://book-website-backend.vercel.app'  // URL cho môi trường production
        : 'http://localhost:3000',       // URL cho môi trường development
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Interceptor để kiểm tra lỗi 401 và 403
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const currentUrl = window.location.pathname;
        if (error.response && (error.response.status === 401 || error.response.status === 403) && currentUrl !== '/login') {
            destroyCookie(null, 'token'); // Xóa token nếu hết hạn hoặc không hợp lệ
            window.location.href = '/login'; // Điều hướng sang trang đăng nhập
        }
        if (error.response && (error.response.status === 500 || error.response.status === 404) && typeof error.response.data === 'object') {
            alert(error.response.data.message || "Có lỗi xảy ra (404 | 500)");
        }
        return Promise.reject(error);
    }
);

export default api;
