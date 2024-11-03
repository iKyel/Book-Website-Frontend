'use client';

import { useDetailOrder, useOrder } from '@/contexts/AppContext';
import { IDetailOrder } from '@/stores/detailOderStore';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const Cart = observer(() => {
  const detailOrderStore = useDetailOrder();
  const orderStore = useOrder();
  const router = useRouter();

  const originalItems = JSON.parse(JSON.stringify(detailOrderStore?.detailCarts)) || [] as IDetailOrder[];;
  const [items, setItems] = useState<IDetailOrder[]>(detailOrderStore?.detailCarts || []);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isPayment, setIsPayment] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await detailOrderStore?.getDetailCart();
      if (result) {
        setItems(result);
        if (orderStore) setTotalPrice(orderStore.orders.map((order) => order.orderStatus === 'Cart' ? order.totalPrice : 0)[0]);
      }
    };

    fetchData();
  }, []);

  function compareArrays(arr1: IDetailOrder[], arr2: IDetailOrder[]) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    return arr1.every((item, index) => item.quantity === arr2[index].quantity);
  }

  //calculateTotal
  const calculateTotal = () => {
    const total = items.reduce((sum, item) => sum + item.bookId.salePrice * item.quantity, 0);
    // console.log(total, 'total');
    setTotalPrice(total);
  };

  //handleQuantityChange
  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (!Number.isNaN(newQuantity) && newQuantity <= 9999) {
      items[index].quantity = newQuantity;
      setItems(items);
      // console.log(items[index].quantity);
      // console.log(originalItems[index].quantity, "quantity");
      if (compareArrays(items, originalItems)) { setIsUpdated(false); setIsPayment(true) }
      else { setIsUpdated(true); setIsPayment(false) }
      calculateTotal();
    }
  };

  //handleUpdate
  const handleUpdate = async () => {
    const updated_list = items.filter((item, index) => item.quantity !== originalItems[index].quantity);
    // console.log(updated_list);
    const result = await detailOrderStore?.putDetailCart(updated_list, totalPrice);
    // console.log(result, "result update"); 
    if (result) {
      setIsUpdated(false);
      setIsPayment(true);
    }

  };

  //handleDelete
  const handleDelete = async (orderDetailId: string) => {
    const result = await detailOrderStore?.deleteDetailCart(orderDetailId);
    if (result) {
      setItems(result);
      setIsUpdated(false);
    }
  };


  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Giỏ hàng</h2>

      {/* Tiêu đề các cột */}
      <div className="grid grid-cols-6 gap-4 mb-2 font-semibold text-center">
        <span className='col-span-3'>Tên sản phẩm</span>
        <span>Số lượng</span>
        <span>Giá tiền</span>
        <span></span>
      </div>

      {/* Danh sách sản phẩm */}
      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-6 gap-4 items-center py-2 border-b">
          <Link href={`/list/${item.bookId.id}`} className='col-span-3'>
            <div className="flex items-center space-x-4">
              <img src={item.bookId.imageURL} alt={item.bookId.title} className="h-32 object-cover rounded" />
              <span>{item.bookId.title}</span>
            </div>
          </Link>

          {/* Số lượng */}
          <div className='mx-auto'>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
              className="w-16 border rounded text-center"
              min="1"
            />
          </div>

          {/* Giá tiền */}
          <span className='mx-auto'>{item.bookId.salePrice * item.quantity} đ</span>

          {/* Nút xóa */}
          <button onClick={() => handleDelete(item.bookId.id)} className="text-red-600 hover:underline mx-auto">
            Xóa
          </button>
        </div>
      ))}

      {/* Tổng giá */}
      <div className="flex justify-end items-center mt-4 font-semibold">
        <span>Tổng giá:</span>
        <span className='w-40 text-right'>{totalPrice} đ</span>
      </div>

      {/* Nút hành động */}
      <div className="flex justify-between mt-4">
        <button className="text-blue-600 hover:underline" onClick={() => { router.push('/list') }}>Tiếp tục mua hàng</button>
        <div className="space-x-4">
          <button
            onClick={handleUpdate}
            className={`px-4 py-2 border rounded ${isUpdated ? 'bg-blue-600 text-white cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            disabled={!isUpdated}
          >
            Cập nhật
          </button>
          <button className={`px-4 py-2 rounded ${isPayment ? 'bg-green-600 text-white cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            disabled={!isPayment}
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
});

export default Cart;
