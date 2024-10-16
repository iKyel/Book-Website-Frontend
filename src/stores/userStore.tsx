import { makeAutoObservable, runInAction } from 'mobx';
import axiosInstance from '@/utils/axiosInstance';
import api from '@/utils/catchErrorToken';
import axios from 'axios';

export interface IUser { userName: string; fullName: string };

class UserStore {
    user: IUser | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async signupUser(fullName: string, userName: string, password: string) {
        try {
            const response = await axiosInstance.post('/auth/register', { fullName, userName, password });
            // const response = await axiosInstance.post('/api/register', { fullName, userName, password });
            if (response.data) return response.data;

        } catch (error) {
            console.error("Lỗi đăng kí", error);
            if (axios.isAxiosError(error)) {
                return error.response?.data;
            }
        }
    }

    async loginUser(userName: string, password: string) {
        try {
            const response = await axiosInstance.post('/auth/login', { userName, password });
            // const response = await axiosInstance.post('/api/login', { userName, password });
            console.log(response.data);
            if (response) {
                if (response.data.message === "Đăng nhập thành công!") {
                    const user = response.data.userData;
                    runInAction(() => {
                        this.user = user;
                    })
                    // const user: IUser = { userName: 'hoang', fullName: 'Hoang' };
                    // runInAction(() => {
                    //     this.user = user;
                    // })
                }
                return response.data;
            }

        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            if (axios.isAxiosError(error)) {
                return error.response?.data;
            }
        }
    }

    async logout() {
        try {
            const response = await axiosInstance.get('/auth/logout');
            if (response.data) {
                this.user = null;
                return response.data;
            }
        } catch (error) {
            console.log("Lỗi đăng xuất ", error);
        }

    }

    async changePassword(userName: string = '', oldPassword: string, newPassword: string) {
        try {
            const response = await api.post('/profile/changePassword', { userName, oldPassword, newPassword });
            if (response) {
                return response.data;
            }
        } catch (error) {
            console.error('Có lỗi xảy ra khi thay đổi mật khẩu', error);
            if (axios.isAxiosError(error)) {
                return error.response?.data;
            }
        }
    }
}

export const userStore = new UserStore();
