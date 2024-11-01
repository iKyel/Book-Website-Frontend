import api from "@/utils/catchErrorToken";
import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { orderStore } from "./orderStore";

interface IBookProps {
    id: string,
    title: string,
    salePrice: number,
    imageURL: string
}

export interface IDetailOrder {
    id: string;
    orderId: string;
    bookId: IBookProps;
    quantity: number;
    price: number;
}

export interface IDetailOrderRequest {
    id: string;
    orderId: string;
    bookId: string;
    quantity: number;
    price: number;
}

const convert_bookProp = (bookProps: any) => {
    return {
        ...bookProps,
        id: bookProps._id
    }
}

const convert = (detailCart: any) => {
    return {
        ...detailCart,
        id: detailCart._id,
        bookId: convert_bookProp(detailCart.bookId),
    }
}

class DetailOrderStore {
    detailCarts: IDetailOrder[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async postDetailCart(bookId: string, price: number, soLgSachThem: number) {
        try {
            const response = await api.post('/api/addCart', { bookId, price, soLgSachThem });
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            console.error("Lỗi thêm chi tiết giỏ hàng", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response?.data;
            }
        }
    }

    async getDetailCart() {
        try {
            // const response = await api.get('/order/getCart');
            const response = await api.get('/api/getDetailCart');
            // console.log(response, 'response detailOrderStore');
            if (response.data) {
                const result = await orderStore.getCart(response.data.order);
                if (result) {
                    runInAction(() => {
                        this.detailCarts = response.data.orderDetail.map((detailCart: any) => convert(detailCart));
                    })

                    return response.data.orderDetail.map((detailCart: any) => convert(detailCart));
                }
            }
            else return null;
        } catch (error) {
            console.error("Lỗi xem chi tiết giỏ hàng", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response?.data;
            }
        }
    }

    async putDetailCart(updated_list: any[], totalPrice: number) {
        try {
            const detailOrder_list = updated_list.map((item) => { return { ...item, bookId: item.bookId.id } });
            // const response = await api.put('/order/updateCart', {updated_list, totalPrice});
            const response = await api.put('/api/updateCart', { detailOrder_list, totalPrice });
            if (response.data) {
                const result = await orderStore.getCart(response.data.order);
                if (result) {
                    runInAction(() => {
                        this.detailCarts = response.data.orderDetail.map((detailCart: any) => convert(detailCart));
                    })

                    return response.data.orderDetail.map((detailCart: any) => convert(detailCart));
                }
            }
        } catch (error) {
            console.error("Lỗi cập nhật chi tiết giỏ hàng", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response?.data;
            }
        }
    }

    async deleteDetailCart(orderDetailId: string) {
        try {
            // const response = await api.delete(`/order/deleteCart/${orderDetailId}`);
            const response = await api.delete(`/api/deleteCart/${orderDetailId}`);
            if (response.data) {
                const result = await orderStore.getCart(response.data.order);
                console.log(response.data, 'deleteCart');
                if (result) {
                    runInAction(() => {
                        this.detailCarts = response.data.orderDetail.map((detailCart: any) => convert(detailCart));
                    })
                    return response.data.orderDetail.map((detailCart: any) => convert(detailCart));
                }
            }
        } catch (error) {
            console.error("Lỗi xóa chi tiết giỏ hàng", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }
}

export const detailOrderStore = new DetailOrderStore();