import axios from 'axios';
import { destroyCookie } from 'nookies';

const api = axios.create({
    // baseURL: 'https://book-website-backend.vercel.app',
    baseURL: 'http://localhost:3000',
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
        return Promise.reject(error);
    }
);

export default api;
