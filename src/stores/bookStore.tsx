import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";

export interface IBook {
    id: string,
    title: string,
    discount: string,
    salePrice: number,
    image: string
}

class BookStore {
    books: IBook[] | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async getFilterandArrangeBooks(categories: string[], salePrice: { min: number, max: number }, sortOption: string, currentPage: number) {
        // console.log("salePrice: ", salePrice);
        // console.log("categories: ", categories);
        try {
            const response = await axiosInstance.post('/api/filterAndArrangeBooks', { categories, salePrice, sortOption, currentPage });
            if (response) {
                if (response.data) {
                    runInAction(() => {
                        this.books = response.data;
                    })
                    return response.data;
                }
            }
            return null;
        } catch (error) {
            console.error("Lỗi lọc, sắp xếp sách ", error);
            if (axios.isAxiosError(error)) {
                return error.response?.data;
            }
        }
    }

    async getBookByName(searchName: string) {
        try {
            // const response = await axiosInstance.post('/books/getBooksByName', { searchName })
            const response = await axiosInstance.post('/api/getBooksByName', { searchName })
            if (response) {
                if (response.data) {
                    return response.data;
                }
            }
            return null;
        } catch (error) {
            console.error("Lỗi tìm kiếm sách ", error);
            if (axios.isAxiosError(error)) {
                return error.response?.data;
            }
        }
    }
}

export const bookStore = new BookStore();