import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";

export interface IAuthor {
    id: string,
    authorName: string,
    description: string
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
            if (response.data) {
                runInAction(() => {
                    this.authors = response.data;
                })
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

}

export const authorStore = new AuthorStore();