import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";

export interface IBook {
    id: string,
    title: string,
    salePrice: number,
    image: string
}

const convert = (book: any) => {
    return {
        id: book._id,
        title: book.title,
        salePrice: book.salePrice,
        image: book.image
    }
};

class BookStore {
    books: IBook[] | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async getFilterandArrangeBooks(categories: string[], salePrice: { min: number, max: number }, sortOption: string, currentPage: number) {
        // console.log("salePrice: ", salePrice);
        // console.log("categories: ", categories);
        try {
            // const response = await axiosInstance.get('/api/filterAndArrangeBooks', { params: { categories, salePrice, sortOption, currentPage } });
            const response = await axiosInstance.get('/books/getFilteredBooks', { params: { categories, salePrice, sortOption, currentPage } });

            console.log(response.data);
            if (response) {
                if (response.data) {
                    runInAction(() => {
                        this.books = response.data.map((book: any) => convert(book));
                    });
                    return response.data.map((book: any) => convert(book));
                }
            }
            return null;
        } catch (error) {
            console.error("Lỗi lọc, sắp xếp sách ", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response?.data;
            }
        }
    }

    async getBookByName(searchName: string, currentPage: number) {
        try {
            const response = await axiosInstance.get('/books/getBooksByName/', { params: { searchName, currentPage } })
            // const response = await axiosInstance.get('/api/getBooksByName', { params: { searchName, currentPage } })
            if (response) {
                if (response.data) {
                    return response.data.map((book: any) => convert(book));
                }
            }
            return null;
        } catch (error) {
            console.error("Lỗi tìm kiếm sách ", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response?.data;
            }
        }
    }
}

export const bookStore = new BookStore();