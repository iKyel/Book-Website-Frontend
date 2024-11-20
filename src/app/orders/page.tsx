'use client';

import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { orderStore } from '@/stores/orderStore';
import OrderList from '@/components/organisms/OrderList';
import Container from '@/components/organisms/Container';
import Sidebar from '@/components/organisms/Sidebar';

const OrdersPage = observer(() => {
    useEffect(() => {
        const fetchData = async () => {
            await orderStore.getOrders();
        }
        fetchData();
    }, []);

    return (
        <Container>
            <div className="min-h-screen flex">
                {/* Sidebar */}
                <Sidebar />
                <OrderList orders={orderStore.orders.filter((order) => order.orderStatus !== 'Cart')} />
            </div>
        </Container>
    )
});

export default OrdersPage;
