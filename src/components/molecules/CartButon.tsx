'use client';
import { useDetailOrder, useUser } from "@/contexts/AppContext";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";

const CartButton = observer(() => {
    const detailOrderStore = useDetailOrder();
    const userStore = useUser();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await detailOrderStore?.getDetailCartLength();
            if (result) {
                setIsClient(true);
            }
        }
        fetchData();
    }, []);
    return (
        <div>
            <span className="ml-2">Giỏ hàng</span>
            {userStore && userStore.user && isClient
                ?
                (<span className="ml-1 text-sm"><span className="font-bold">({detailOrderStore?.detailCarts.length}</span> sản phẩm)</span>)
                :
                (<span></span>)
            }
        </div>
    )
});

export default CartButton;