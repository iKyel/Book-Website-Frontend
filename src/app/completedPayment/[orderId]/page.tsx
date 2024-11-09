'use client';
import Container from '@/components/organisms/Container';
import ListBooks from '@/components/organisms/ListBooks';
import { useDetailOrder, useOrder, useUser } from '@/contexts/AppContext';
import { IBook } from '@/stores/bookStore';
import { IDetailOrder } from '@/stores/detailOderStore';
import { IOrder } from '@/stores/orderStore';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const CompletedPayment = () => {
  const params = useParams();
  const id = params.orderId as string;

  const router = useRouter();
  const detailOrderStore = useDetailOrder();
  const userStore = useUser();
  const [order, setOrder] = useState<IOrder>();
  const [detailOrders, setDetailOrders] = useState<IDetailOrder[]>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await detailOrderStore?.getDetailOrders(id);
      if (result && result.order && result.detailOrders) {
        setOrder(result.order);
        setDetailOrders(result.detailOrders);
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
            <p>Họ tên: {userStore?.user?.fullName}</p>
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
          <ListBooks books={detailOrderStore?.detailOrders?.map((detailOrder) => {
            const book: IBook = { id: detailOrder.bookId.id, image: detailOrder.bookId.imageURL, title: detailOrder.bookId.title, salePrice: detailOrder.bookId.salePrice };
            return book;
          }) || [] as IBook[]} />

          <hr className="my-4" />
          <div className="flex justify-between">
            <p>Tạm tính</p>
            <p>{order?.totalPrice}₫</p>
          </div>

          <div className="flex justify-between mt-2">
            <p>Phí vận chuyển</p>
            <p>0₫</p>
          </div>

          <hr className="my-4" />
          <div className="flex justify-between font-semibold text-lg">
            <p>Tổng cộng</p>
            <p>{order?.totalPrice}₫</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CompletedPayment;
