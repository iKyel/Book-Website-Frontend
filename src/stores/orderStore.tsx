import api from "@/utils/catchErrorToken";
import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

export interface IOrder {
    id: string;
    userId?: string;
    orderStatus: string;
    paymentType?: string;
    totalPrice: number;
    phoneNumber?: string;
    address?: string;
    createAt?: string;
    deliveryBrand?: string;
}

const convert = (order: any) => {
    return {
        ...order,
        id: order._id
    }
}

class OrderStore {
    orders: IOrder[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async getCart(cart: any) {
        if (cart) {
            runInAction(() => {
                this.orders = [convert(cart)];
            })
            return true;
        }
        else {
            return false;
        }
    }

    async getOrders() {
        try {
            // const response = await api.get('/order/getOrders');
            const response = await api.get('/api/getOrders');
            if (response.data) {
                if (response.data.orders) {
                    this.orders = response.data.orders.map((order: any) => convert(order));
                }
                return response.data.orders;
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
}

export const orderStore = new OrderStore();