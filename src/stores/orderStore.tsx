import api from "@/utils/catchErrorToken";
import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { detailOrderStore } from "./detailOderStore";

export interface IOrder {
    id: string;
    userId?: string;
    orderStatus: string;
    paymentType?: string;
    totalPrice: number;
    phoneNumber?: string;
    address?: string;
    createAt?: string;
    updatedAt?: string;
    deliveryBrand?: string;
}

const convert = (order: any) => {
    return {
        ...order,
        id: order._id,
    }
}

class OrderStore {
    orders: IOrder[] = [];
    cart: IOrder[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async getCart(cart: any) {
        if (cart) {
            runInAction(() => {
                this.cart = [convert(cart)];
            })
            // console.log(this.cart);
            return true;
        }
        else {
            return false;
        }
    }

    async getOrders() {
        try {
            const response = await api.get('/order/getOrders');
            // const response = await api.get('/api/getOrders');
            if (response.data) {
                if (response.data.orders) {
                    runInAction(() => {
                        this.orders = response.data.orders.map((order: any) => convert(order));
                    })
                    return response.data.orders;
                }

            }

        } catch (error) {
            console.error("Lỗi lấy danh sách đơn hàng", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    getConvertOrder(order_obj: any) {
        if (this.orders.some((order) => order.id === order_obj._id)) {
            return convert(order_obj);
        }
    }

    async checkQuantityBook(orderId: string) {
        try {
            const response = await api.get('/order/checkQuantityBook', { params: { orderId } });
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            console.error("Lỗi kiểm tra số lượng sách trong từng đơn hàng", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async completeOrder(id: string, paymentType: string, phoneNumber: string, address: string) {
        try {
            const response = await api.put('/order/createOrder', { order: { id, paymentType, phoneNumber, address } });
            if (response && response.data) {
                if (response.data.order) {
                    runInAction(() => {
                        this.orders = [convert(response.data.order)];
                    })
                    return response.data;
                }
                return null;
            }

        } catch (error) {
            console.error("Lỗi hoàn thành đơn hàng", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }
}

export const orderStore = new OrderStore();