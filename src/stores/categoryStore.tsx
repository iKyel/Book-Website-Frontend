import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";

export interface ICategory {
    id: string,
    categoryName: string
}

class CategoryStore {
    categories: ICategory[] | null = null;

    constructor() {
        makeAutoObservable(this);
        this.getCategories();
    }

    async getCategories() {
        try {
            const response = await axiosInstance.get('/api/categories');
            if (response) {
                if (response.data) {
                    runInAction(() => {
                        this.categories = response.data;
                    })
                    return response.data;
                }
            }
            return null;
        } catch (error) {
            console.log("Lỗi lấy thể loại", error);
            if (axios.isAxiosError(error)) {
                return error.response?.data;
            }
        }
    }

}

export const categoryStore = new CategoryStore();