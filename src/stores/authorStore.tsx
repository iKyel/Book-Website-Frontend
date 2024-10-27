import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";

export interface IAuthor {
    id: string,
    authorName: string,
    description?: string
}

const convert = (author: any) => {
    return {
        id: author._id,
        authorName: author.authorName,
        description: author.description,
    }
};

const convert_listbooks = (books: any[]) => {
    return books.map((book) => {
        return {
            id: book._id,
            title: book.title,
            salePrice: book.salePrice,
            image: book.imageURL
        }
    });
};

const convert_categories = (categories: string[]) => {
    return categories.join(",");
}

const convert_price = (salePrice: any) => {
    return Object.values(salePrice).join(':');
}

class AuthorStore {
    authors: IAuthor[] | null = null;

    constructor() {
        makeAutoObservable(this);
        this.getAllAuthors();
    }

    async getAllAuthors() {
        try {
            const response = await axiosInstance.get('/books/getAuthors');
            if (response.data.authors) {
                runInAction(() => {
                    this.authors = response.data.authors.map((author: any) => convert(author));
                });
                return response.data.authors.map((author: any) => convert(author));
            }
            return null;
        } catch (error) {
            console.error("Lỗi lấy danh sách tác giả ", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    getAuthorIdByAuthorName(authorName: string[]) {
        const author = this.authors?.filter((author) => authorName.includes(author.authorName));
        if (author) return author;
    }

    async getAuthorById(authorId: string, categories: string[], salePrice: { min: number, max: number }, sortOption: string, currentPage: number) {
        const page = currentPage;
        const sortBy = sortOption;
        const types = convert_categories(categories);
        const priceRange = convert_price(salePrice);
        try {
            // const response = await axiosInstance.get(`/api/getAuthorById/${authorId}`, { params: { categories, salePrice, sortOption, currentPage } });
            const response = await axiosInstance.get(`/books/getDetailAuthor/${authorId}`, { params: { types, priceRange, sortBy, page } });
            if (response.data) {
                console.log(response.data);
                if (response.data.author && response.data.listBooks) {
                    console.log({ author: response.data.author, listBooks: convert_listbooks(response.data.listBooks) })
                    return { author: response.data.author, listBooks: convert_listbooks(response.data.listBooks) };
                }
                return null;
            }
        } catch (error) {
            console.error("Lỗi lấy thông tin tác giả ", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

}

export const authorStore = new AuthorStore();