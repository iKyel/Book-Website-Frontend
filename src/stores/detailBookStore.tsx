import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

export interface IDetailBook {
    id: string,
    title: string,
    publisher: string,
    authors: string[],
    categories: string[],
    salePrice: number,
    quantity: number,
    publishedYear: number,
    size: string,
    coverForm: string,
    content: string,
    image: string
}

const convert = (book: any) => {
    return {
        id: book._id,
        title: book.title,
        publisher: book.publisher,
        authors: book.authors,
        categories: book.categories,
        salePrice: book.salePrice,
        quantity: book.quantity,
        publishedYear: book.publishedYear,
        size: book.size,
        coverForm: book.coverForm,
        content: book.content,
        image: book.image
    }
};

class DetailBookStore {
    detailBook: IDetailBook | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async getDetailBook(id: string) {
        try {
            // const response = await axiosInstance.get(`/api/detailBook/${id}`);
            const response = await axiosInstance.get(`/books/getDetailBook/${id}`);
            if (response) {
                if (response.data) {
                    runInAction(() => {
                        this.detailBook = convert(response.data);
                    })
                    return convert(response.data);
                }
            }
            return null;

        } catch (error) {
            console.error("Lỗi lấy chi tiết thông tin sách ", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response?.data;
            }
        }
    }
}

export const detailBookStore = new DetailBookStore();