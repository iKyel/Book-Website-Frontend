import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";

export interface ICategory {
    id: string,
    categoryName: string
}
const convert = (category: any) => {
    return {
        id: category._id,
        categoryName: category.categoryName
    }
}

class CategoryStore {
    categories: ICategory[] | null = null;

    constructor() {
        makeAutoObservable(this);
        this.getCategories();
    }

    async getCategories() {
        try {
            // const response = await axiosInstance.get('/api/categories');
            const response = await axiosInstance.get('/books/getCategories');
            if (response) {
                if (response.data) {
                    runInAction(() => {
                        this.categories = response.data.map((category: any) => {
                            convert(category);
                        });
                    })
                    return response.data.map((category: any) => {
                        convert(category);
                    });
                }
            }
            return null;
        } catch (error) {
            console.log("Lỗi lấy thể loại", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async getCategoriesbyBookID() {

    }

}

export const categoryStore = new CategoryStore();