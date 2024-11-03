'use client';

import { useDetailOrder } from "@/contexts/AppContext";
import React, { useEffect, useState } from "react";

const CartButton = () => {
    const detailOrderStore = useDetailOrder();

    const [numOfDetailCart, setNumOfDetailCart] = useState(detailOrderStore?.detailCarts.length || 0);

    useEffect(() => {
        const fetchData = async () => {
            const result = await detailOrderStore?.getDetailCart();
            if (result) {
                setNumOfDetailCart(result.length);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <span className="ml-2">Giỏ hàng</span>
            <span className="ml-1 text-sm">(<span className="font-bold">{numOfDetailCart}</span> sản phẩm)</span>
        </>
    )
}

export default CartButton;