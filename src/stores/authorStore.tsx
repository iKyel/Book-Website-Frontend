import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";

export interface IAuthor {
    id: string,
    categoryName: string
}

class AuthorStore {
    authors: IAuthor[] | null = null;

    constructor() {
        makeAutoObservable(this);
    }


}

export const authorStore = new AuthorStore();