'use client';
import { useDetailOrder, useUser } from "@/contexts/AppContext";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";

const CartButton = observer(() => {
    const detailOrderStore = useDetailOrder();
    const userStore = useUser();
    return (
        <>
            <span className="ml-2">Giỏ hàng</span>
            {detailOrderStore && detailOrderStore.detailOrders.length > 0 && userStore && userStore.user
                ?
                (<span className="ml-1 text-sm"><span className="font-bold">({detailOrderStore.detailOrders.length}</span> sản phẩm)</span>)
                :
                (<></>)
            }
        </>
    )
});

export default CartButton;