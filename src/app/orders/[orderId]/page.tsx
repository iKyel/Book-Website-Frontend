'use client';

import Container from '@/components/organisms/Container';
import OrderDetail from '@/components/organisms/OrderDetail';
import Sidebar from '@/components/organisms/Sidebar';
import { useDetailOrder, useOrder, useUser } from '@/contexts/AppContext';
import { IDetailOrder } from '@/stores/detailOderStore';
import { IOrder } from '@/stores/orderStore';
import React, { useEffect, useState } from 'react';

interface OrderDetailProps {
    params: {
        id: string;
    };
}

const OrderList: React.FC<OrderDetailProps> = ({ params }) => {
    const detailOrderStore = useDetailOrder();
    const orderStore = useOrder();
    const userStore = useUser();
    const { id } = params;

    const [order, setOrder] = useState<IOrder>();
    const [detailOrders, setDetailOrders] = useState<IDetailOrder[]>();

    useEffect(() => {
        const fetchData = async () => {
            const result = await orderStore?.getOrders();
            if (result) {
                const result_list = await detailOrderStore?.getDetailOrders(id);
                if (result_list.order && result_list.detailOrders) {
                    setOrder(result_list.order);
                    setDetailOrders(result_list.detailOrders);
                }
            }
        }
        fetchData();
    }, []);

    return (
        <Container>
            <div className="min-h-screen flex">
                {/* Sidebar */}
                <Sidebar />
                {order && detailOrders && (
                    <OrderDetail
                        orderId={order.id || ''}
                        orderDate={order.createAt || ''}
                        paymentType={order.paymentType || ''}
                        address={order.address || ''}
                        phoneNumber={order.phoneNumber || ''}
                        fullName={userStore?.user?.fullName || ''}
                        products={detailOrders}
                        productTotal={order.totalPrice}
                        shippingFee={0}
                        grandTotal={order.totalPrice}
                    />)
                }
            </div>
        </Container>
    );
};

export default OrderList;
