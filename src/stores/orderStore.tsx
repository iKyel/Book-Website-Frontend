import api from "@/utils/catchErrorToken";
import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import React from "react";

export interface IOrder {
    id: string;
    userId: string;
    orderStatus: string;
    paymentType?: string;
    totalPrice: number;
    phoneNumber?: string;
    address?: string;
}

const convert = (cart: any) => {
    return {
        ...cart,
        id: cart._id
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
                this.orders.push(convert(cart));
            })
            return true;
        }
        else {
            return false;
        }
    }
}

export const orderStore = new OrderStore();