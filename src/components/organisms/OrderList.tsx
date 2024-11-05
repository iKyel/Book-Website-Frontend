import { IOrder } from '@/stores/orderStore';
import { useRouter } from 'next/navigation';
import React from 'react';

const OrderList = ({ orders }: { orders: IOrder[] }) => {
    const router = useRouter();

    const handleClickList = (index: number) => {
        router.push(`/orders/${orders[index].id}`);
    }

    return (
        <div className="w-3/4 mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">ĐƠN HÀNG CỦA TÔI</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-3 px-4 font-semibold text-left">Mã đơn hàng</th>
                            <th className="py-3 px-4 font-semibold text-left">Ngày đặt</th>
                            <th className="py-3 px-4 font-semibold text-left">Trạng thái</th>
                            <th className="py-3 px-4 font-semibold text-left">Vận chuyển</th>
                            <th className="py-3 px-4 font-semibold text-left">Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr className="border-b hover:bg-gray-50" key={index} onClick={() => handleClickList(index)}>

                                <td className="py-3 px-4">{order.id}</td>
                                <td className="py-3 px-4">{order.createAt}</td>
                                <td className="py-3 px-4">{order.orderStatus}</td>
                                <td className="py-3 px-4">{order.deliveryBrand}</td>
                                <td className="py-3 px-4">{order.totalPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;
