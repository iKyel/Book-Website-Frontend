import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";

export interface IBook {
    id: string,
    title: string,
    salePrice: number,
    image: string
}

const convert_categories = (categories: string[]) => {
    return categories.join(",");
}

const convert_price = (salePrice: any) => {
    return Object.values(salePrice).join(':');
}

const convert = (book: any) => {
    return {
        id: book._id,
        title: book.title,
        salePrice: book.salePrice,
        image: book.imageURL
    }
};

class BookStore {
    books: IBook[] | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async getFilterandArrangeBooks(categories: string[], salePrice: { min: number, max: number }, sortOption: string, currentPage: number) {
        const page = currentPage;
        const sortBy = sortOption;
        const types = convert_categories(categories);
        const priceRange = convert_price(salePrice);
        try {
            // const response = await axiosInstance.get('/api/filterAndArrangeBooks', { params: { categories, salePrice, sortOption, currentPage } });
            const response = await axiosInstance.get('/books/getFilteredBooks', { params: { types, priceRange, sortBy, page } });
            // console.log(response.data.listBooks);

            if (response) {
                if (response.data.listBooks) {
                    runInAction(() => {
                        this.books = response.data.listBooks.map((book: any) => convert(book));
                    });
                    return response.data.listBooks.map((book: any) => convert(book));
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
        const page = currentPage;
        try {
            const response = await axiosInstance.get('/books/getBooksByName/', { params: { searchName, page } })
            // const response = await axiosInstance.get('/api/getBooksByName', { params: { searchName, currentPage } })
            if (response) {
                if (response.data.listBooks) {
                    return response.data.listBooks.map((book: any) => convert(book));
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