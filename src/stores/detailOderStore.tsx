import api from "@/utils/catchErrorToken";
import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { orderStore } from "./orderStore";
import axiosInstance from "@/utils/axiosInstance";

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

const convert = (detailOrder: any) => {
    // console.log(detailCart.bookId, "detailCart, BookId");
    // console.log(convert_bookProp(detailCart.bookId), "detailcart, convert bookId");
    return {
        ...detailOrder,
        id: detailOrder._id,
        bookId: convert_bookProp(detailOrder.bookId),
    }
}

class DetailOrderStore {
    detailOrders: IDetailOrder[] = [];
    detailCarts: IDetailOrder[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async postDetailCart(bookId: string, price: number, soLgSachThem: number, soLgTonKho: number) {
        try {
            // const response = await api.post('/api/addCart', { bookId, price, soLgSachThem });
            const response = await api.post('/order/addCart', { bookId, price, soLgSachThem, soLgTonKho });
            if (response.data) {
                this.getDetailCartLength();
                return response.data;
            }
        } catch (error) {
            console.error("Lỗi thêm chi tiết giỏ hàng", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response?.data;
            }
        }
    }

    async getDetailCartLength() {
        try {
            const response = await axiosInstance.get('/order/getCart');
            if (response.data) {
                const result = await orderStore.getCart(response.data.order);
                if (result) {
                    if (response.data && response.data.orderDetails) {
                        runInAction(() => {
                            this.detailCarts = response.data.orderDetails.map((detailCart: any) => convert(detailCart));
                        })
                        return response.data.orderDetails.map((detailCart: any) => convert(detailCart));
                    }
                    else return null;
                }
            }
        } catch (error) {
            console.error("Lỗi xem số lượng danh sách sách trong giỏ hàng", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response?.data;
            }
        }
    }

    async getDetailCart() {
        try {
            const response = await api.get('/order/getCart');
            if (response.data) {
                const result = await orderStore.getCart(response.data.order);
                if (result) {
                    runInAction(() => {
                        this.detailCarts = response.data.orderDetails.map((detailCart: any) => convert(detailCart));
                    })
                    return response.data.orderDetails.map((detailCart: any) => convert(detailCart));
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

    async putDetailCart(updated_list: any[]) {
        try {
            const updatedOrderDetails = updated_list.map((item) => { const { id, __v, ...productWithoutId } = item; return { ...productWithoutId, bookId: item.bookId.id, price: item.bookId.salePrice * item.quantity } });
            console.log(updatedOrderDetails, "detailOrder_list");
            const response = await api.put('/order/updateCart', { updatedOrderDetails });
            // const response = await api.put('/api/updateCart', { updatedOrderDetails, totalPrice });
            // console.log("response putdetailCart", response.data);
            if (response.data) {
                const result = await orderStore.getCart(response.data.order);
                if (result) {
                    runInAction(() => {
                        this.detailCarts = response.data.orderDetails.map((detailCart: any) => convert(detailCart));
                    })
                    return {
                        message: response.data.message, detailOrders: response.data.orderDetails.map((detailCart: any) => convert(detailCart))
                    }
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
            const response = await api.delete(`/order/deleteCart/${orderDetailId}`);
            // const response = await api.delete(`/api/deleteCart/${orderDetailId}`);
            if (response.data) {
                const result = await orderStore.getCart(response.data.order);
                // console.log(response.data, 'deleteCart');
                if (result) {
                    runInAction(() => {
                        this.detailCarts = response.data.orderDetails.map((detailCart: any) => convert(detailCart));
                    })
                    return response.data.orderDetails.map((detailCart: any) => convert(detailCart));
                }
            }
        } catch (error) {
            console.error("Lỗi xóa chi tiết giỏ hàng", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async getDetailOrders(orderId: string) {
        try {
            const response = await api.get(`/order/getOrderDetails/${orderId}`);
            // const response = await api.get(`/api/getOrderDetails/${orderId}`);
            if (response.data) {
                const result = orderStore.getConvertOrder(response.data.order);
                if (result) {
                    runInAction(() => {
                        this.detailOrders = response.data.orderDetails.map((detailOrder: any) => convert(detailOrder));
                    })
                    return { order: result, detailOrders: response.data.orderDetails.map((detailOrder: any) => convert(detailOrder)) };
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