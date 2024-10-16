import { makeAutoObservable, runInAction } from "mobx";
import api from '@/utils/catchErrorToken';
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";

export interface IBook {
    id: string,
    title: string,
    publisher: string,
    discount: string,
    salePrice: number,
    quantity: number,
    publishedYear: number,
    size: string,
    coverForm: string,
    content: string,
    image: string
    author: string[],
    category: string[]
}

class BookStore {
    books: IBook[] | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async getArrangeData(arrangeType: string) {
        try {
            const response = await axiosInstance.post('/api/arrangeBooks', arrangeType);
            if (response && response.data) {
                runInAction(() => {
                    this.books = response.data;
                });
                return response.data;
            }
            else return null;
        } catch (error) {
            console.error("Lỗi sắp xếp sách ", error);
            if (axios.isAxiosError(error)) {
                return error.response?.data;
            }
        }

    }
}

export const bookStore = new BookStore();