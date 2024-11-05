import { IDetailOrder } from '@/stores/detailOderStore';
import React from 'react';

type OrderDetailProps = {
    orderId: string;
    orderDate: string;
    products: IDetailOrder[];
    productTotal: number;
    shippingFee: number;
    grandTotal: number;
    address: string,
    phoneNumber: string,
    fullName: string,
    paymentType: string
};

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId, orderDate, paymentType, address, phoneNumber, fullName, products, productTotal, shippingFee, grandTotal }) => {
    return (
        <div className="w-3/4 mx-auto p-4">
            {/* Tiêu đề */}
            <div className='flex justify-between items-center'>
                <h1 className="text-2xl font-bold text-center mb-6 ml-4">ĐƠN HÀNG {orderId}</h1>
                <p className="text-center mb-8">ĐẶT LÚC: {orderDate}</p>
            </div>

            {/* Thông tin khách hàng */}
            <div className="bg-gray-100 p-4 mb-8 rounded-md">
                <p><strong>Tình trạng thanh toán:</strong> {paymentType}</p>
                <p><strong>Họ và tên:</strong> {fullName}</p>
                <p><strong>Địa chỉ:</strong> {address}</p>
                <p><strong>Số điện thoại:</strong> {phoneNumber}</p>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 mb-6">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-3 px-4 font-semibold text-left">Sản phẩm</th>
                            <th className="py-3 px-4 font-semibold text-left">Giá</th>
                            <th className="py-3 px-4 font-semibold text-left">Số lượng</th>
                            <th className="py-3 px-4 font-semibold text-left">Tổng cộng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{product.bookId.title}</td>
                                <td className="py-3 px-4">{product.bookId.salePrice}</td>
                                <td className="py-3 px-4">{product.quantity}</td>
                                <td className="py-3 px-4">{product.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Tổng tiền */}
            <div className="text-right">
                <p className="text-lg"><strong>Giá sản phẩm:</strong> {productTotal}</p>
                <p className="text-lg"><strong>Phí vận chuyển:</strong> {shippingFee}</p>
                <p className="text-xl font-bold"><strong>Tổng tiền:</strong> {grandTotal}</p>
            </div>
        </div>
    );
};

export default OrderDetail;
