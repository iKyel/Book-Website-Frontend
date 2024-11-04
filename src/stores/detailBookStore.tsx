import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { IAuthor } from "./authorStore";


export interface IDetailBook {
    id: string,
    title: string,
    publisher: string,
    authors: IAuthor[],
    categories: string[],
    salePrice: number,
    quantity: number,
    publishedYear: number,
    size: string,
    coverForm: string,
    content: string,
    image: string
}

const convert_authors = (authors: any[]) => {
    return authors.map((author) => { return { id: author._id, authorName: author.authorName } });
}

const convert_listBooks = (books: any[]) => {
    return books.map((book) => {
        return {
            id: book._id,
            title: book.title,
            salePrice: book.salePrice,
            image: book.imageURL
        }
    })
};

const convert = (book: any) => {
    return {
        id: book._id,
        title: book.title,
        publisher: book.publisherName,
        authors: convert_authors(book.authors),
        categories: book.categories,
        salePrice: book.salePrice,
        quantity: book.quantity,
        publishedYear: book.publishedYear,
        size: book.size,
        coverForm: book.coverForm,
        content: book.content,
        image: book.imageURL
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
            console.log(response);
            if (response) {
                if (response.data) {
                    if (response.data.detailBook) {
                        runInAction(() => {
                            this.detailBook = convert(response.data.detailBook);
                        })
                        return { detailBook: convert(response.data.detailBook), listBooks: convert_listBooks(response.data.listBooks) };
                    }
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