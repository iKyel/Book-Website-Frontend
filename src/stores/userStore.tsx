// stores/UserStore.ts
import { makeAutoObservable, runInAction } from 'mobx';
import axiosInstance from '@/utils/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import { parseCookies } from 'nookies';

export interface IUser { userName: string; fullName: string };

class UserStore {
    user: IUser | null = null;

    constructor() {
        makeAutoObservable(this);
    }


    async signupUser(fullName: string, userName: string, password: string) {
        try {
            // const response = await axiosInstance.post('/auth/register', { fullName, userName, password });
            const response = await axiosInstance.post('/api/register', { fullName, userName, password });

            const result = response.data;
            return result;
        } catch (error) {
            console.error('Lỗi đăng kí:', error);
        }
    }

    async loginUser(userName: string, password: string) {
        try {
            // const response = await axiosInstance.post('/auth/login', { userName, password });
            const response = await axiosInstance.post('/api/login', { userName, password });
            console.log(response.data);

            if (response.data) {
                if (response.data.message === "Đăng nhập thành công") {
                    const cookies = parseCookies();
                    const token = cookies.token;
                    if (token) {
                        try {
                            // Giải mã token để lấy thông tin người dùng
                            const user: IUser = jwtDecode(token);


                            runInAction(() => {
                                this.user = user;
                            })
                        } catch (error) {
                            console.error('Lỗi xảy ra khi giải mã token:', error);
                        }
                    }
                    // const user: IUser = { userName: 'hoang', fullName: 'Hoang' };
                    // runInAction(() => {
                    //     this.user = user;
                    // })
                }

                const result = response.data;
                return result;
            }

        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
        }
    }

    async logout() {
        try {
            const response = await axiosInstance.post('/auth/logout');
            if (response.data) {
                this.user = null;
                return response.data;
            }

        } catch (error) {

        }

    }
}

export const userStore = new UserStore();
