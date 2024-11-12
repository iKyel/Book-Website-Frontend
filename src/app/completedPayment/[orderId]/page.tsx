'use client';
import Container from '@/components/organisms/Container';
import ListBooks from '@/components/organisms/ListBooks';
import { useDetailOrder, useOrder, useUser } from '@/contexts/AppContext';
import { IBook } from '@/stores/bookStore';
import { IDetailOrder } from '@/stores/detailOderStore';
import { IOrder } from '@/stores/orderStore';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface OrderDetailProps {
  params: {
    orderId: string;
  };
}

const CompletedPayment: React.FC<OrderDetailProps> = observer(({ params }) => {
  const { orderId } = params;
  // console.log(orderId, "orderId");

  const router = useRouter();
  const detailOrderStore = useDetailOrder();
  const userStore = useUser();
  const orderStore = useOrder();

  const [order, setOrder] = useState<IOrder>();
  const [detailOrders, setDetailOrders] = useState<IDetailOrder[]>();

  useEffect(() => {
    const fetchData = async () => {
      await detailOrderStore?.getDetailCartLength();
      const result = await orderStore?.getOrders();
      if (result) {
        const result_list = await detailOrderStore?.getDetailOrders(orderId);
        if (result_list && result_list.order && result_list.detailOrders) {
          setOrder(result_list.order);
          setDetailOrders(result_list.detailOrders);
        }
      }
    }
    fetchData();
  }, []);




  return (
    <Container>
      <div className="flex w-full">
        {/* Left Div */}
        <div className="w-1/2 p-4 border-r border-gray-200">
          <h2 className="text-2xl font-semibold">Đặt hàng thành công</h2>
          <p className="mt-2">Mã đơn hàng: {order?.id}</p>
          <p>Cảm ơn bạn đã mua hàng</p>

          <div className="border p-4 mt-4">
            <h3 className="font-semibold">Thông tin đơn hàng</h3>
            {order ? (<p>Họ tên: {userStore?.user?.fullName}</p>) : (<p>Đang tải thông tin...</p>)}
            <p>Địa chỉ: {order?.address}</p>
            <p>Số điện thoại: {order?.phoneNumber}</p>
            <p className="mt-2">Phương thức thanh toán: {order?.paymentType}</p>
          </div>

          <div className="flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 mt-6 rounded hover:bg-blue-600" onClick={() => { router.push('/list'); }}>
              Tiếp tục mua hàng
            </button>
          </div>
        </div>

        {/* Right Div */}
        <div className="w-1/2 p-4">
          {detailOrders &&
            detailOrders.map((item, index) => (
              <div key={index} className="flex items-center mb-4">
                {/* Cột hình ảnh, chiếm khoảng 1/6 */}
                <div className="flex-[1]">
                  <img
                    src={item.bookId.imageURL}
                    alt={item.bookId.title}
                    className="w-16 h-16 object-cover"
                  />
                </div>

                {/* Cột tiêu đề, chiếm khoảng 4/6 */}
                <div className="flex-[4]">
                  <h4 className="font-semibold">{item.bookId.title}</h4>
                </div>

                {/* Cột giá, căn phải, chiếm khoảng 1/6 */}
                <div className="flex-[1] text-right">
                  <p>{item.price.toLocaleString()}đ</p>
                </div>
              </div>
            ))}

          <hr className="my-4" />
          <div className="flex justify-between">
            <p>Tạm tính</p>
            <p>{order?.totalPrice.toLocaleString()}₫</p>
          </div>

          <div className="flex justify-between mt-2">
            <p>Phí vận chuyển</p>
            <p>0₫</p>
          </div>

          <hr className="my-4" />
          <div className="flex justify-between font-semibold text-lg">
            <p>Tổng cộng</p>
            <p>{order?.totalPrice.toLocaleString()}₫</p>
          </div>
        </div>
      </div>
    </Container>
  );
});

export default CompletedPayment;
