'use client'

import Modal from '@/components/molecules/Modal';
import Container from '@/components/organisms/Container';
import ListBooks from '@/components/organisms/ListBooks';
import { useDetailOrder, useOrder, useUser } from '@/contexts/AppContext';
import { IBook } from '@/stores/bookStore';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Payment = observer(() => {
    const userStore = useUser();
    const detailOrderStore = useDetailOrder();
    const orderStore = useOrder();
    const router = useRouter()

    //Options Paypal
    const options = {
        clientId: "AWa7Z_Uj81NjV36f1oB9aw3GWj7ab0ztxnqBbuUAa044LNRcowbZNVR6SmMO_oMcdy4DYx3Qbd2ZHQdc",
        currency: "USD",
        intent: "capture",
        "disable-funding": "card",

    }

    //handleApprove
    const handleApprove = (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
            console.log("Transaction completed by " + details.payer.name.given_name)
            // Xử lý sau khi thanh toán thành công (có thể gửi dữ liệu đến backend)
            setSelectedPaymentMethod('Paypal')
        })
    }

    const [form, setForm] = useState({
        phoneNumber: '',
        address: '',
    });

    const [errors, setErrors] = useState({
        phoneNumber: '',
        address: '',
    });

    //Modal
    const [modalMessage, setModalMessage] = useState('Có lỗi xảy ra');
    const [isModalOpen, setIsModalOpen] = useState(false);

    //handleModal
    const handleModal = () => {
        setIsModalOpen(false);

        if (modalMessage === 'Đặt hàng thành công') {
            router.push(`/completedPayment/${orderStore?.orders[0].id}`);
        }
    }

    // State cho dropdown tỉnh, quận/huyện, phường/xã
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');


    //handleChange
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });

        // Validation
        const newErrors = { ...errors };
        if (name === 'phoneNumber') {
            const phoneNumberRegex = /^[0-9]{8,20}$/;

            newErrors.phoneNumber = phoneNumberRegex.test(value) ? '' : 'Chỉ có thể dùng số trong khoảng 8 đến 20 số';
        }
        if (name === 'address') {
            const addressRegex = /^[a-zA-Z0-9À-ỹ\s]{1,50}$/;
            newErrors.address = addressRegex.test(value) ? '' : 'Chỉ có thể dùng chữ, số, dấu cách và trong khoảng 1 đến 50 kí tự';
        }
        setErrors(newErrors);
    };

    //Check Errors
    const hasErrors = Object.values(errors).some((error) => error !== '');

    //Handle Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!hasErrors) {
            const result = await orderStore?.completeOrder(orderStore.orders[0].id, selectedPaymentMethod, form.phoneNumber, form.address);
            setModalMessage(result.message);
            setIsModalOpen(true);
        }
    };

    return (
        <Container>
            <div className="flex">
                {/* Div trái - Thông tin giao hàng */}
                <div className="w-1/2 p-4 border-r border-gray-200">
                    <h2 className="text-lg font-semibold mb-4">Thông tin giao hàng</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block mb-1">Họ và tên</label>
                            <input
                                type="text"
                                value={userStore?.user?.fullName}
                                readOnly
                                className="w-full border border-gray-300 rounded p-2 bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Số điện thoại</label>
                            <input
                                type="text"
                                name='phoneNumber'
                                value={form.phoneNumber}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded p-2"
                                required />
                        </div>
                        {errors.phoneNumber && (
                            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                        )}

                        <div>
                            <label className="block mb-1">Địa chỉ</label>
                            <input
                                type="text"
                                name='address'
                                value={form.address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded p-2"
                                required />
                        </div>
                        {errors.address && (
                            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                        )}

                        {/* Dropdown cho tỉnh thành, quận huyện, phường xã */}
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label className="block mb-1">Tỉnh/Thành</label>
                                <select
                                    value={selectedProvince}
                                    onChange={(e) => setSelectedProvince(e.target.value)}
                                    className="w-full border border-gray-300 rounded p-2"
                                    required
                                >
                                    <option value="">Tỉnh/Thành</option>
                                    {/* Options cho các tỉnh miền Bắc */}
                                </select>
                            </div>

                            <div className="flex-1">
                                <label className="block mb-1">Quận/Huyện</label>
                                <select
                                    value={selectedDistrict}
                                    onChange={(e) => setSelectedDistrict(e.target.value)}
                                    className="w-full border border-gray-300 rounded p-2"
                                    required
                                >
                                    <option value="">Quận/Huyện</option>
                                    {/* Options dựa trên tỉnh */}
                                </select>
                            </div>

                            <div className="flex-1">
                                <label className="block mb-1">Phường/Xã</label>
                                <select
                                    value={selectedWard}
                                    onChange={(e) => setSelectedWard(e.target.value)}
                                    className="w-full border border-gray-300 rounded p-2"
                                    required
                                >
                                    <option value="">Phường/Xã</option>
                                    {/* Options dựa trên quận/huyện */}
                                </select>
                            </div>
                        </div>


                        {/* Phương thức thanh toán */}
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">Phương thức thanh toán</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {/* Các button phương thức thanh toán */}
                                {/* Nút COD */}
                                <button
                                    type="button"
                                    onClick={() => setSelectedPaymentMethod('COD')}
                                    className={`border text-lg p-4 font-bold rounded ${selectedPaymentMethod === 'COD' ? 'bg-blue-500 text-white' : 'bg-blue-200'
                                        } hover:bg-blue-600`}
                                    disabled={selectedPaymentMethod ? true : false}
                                >
                                    COD
                                </button>

                                <PayPalScriptProvider options={options}>
                                    <PayPalButtons
                                        style={{ layout: "vertical" }}
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                intent: "CAPTURE",
                                                purchase_units: [{
                                                    amount: {
                                                        currency_code: "USD",
                                                        value: "10.00"
                                                    }
                                                }]
                                            })
                                        }}
                                        onApprove={handleApprove}
                                        disabled={selectedPaymentMethod ? true : false}
                                    />
                                </PayPalScriptProvider>

                                <p>{selectedPaymentMethod ? `Bạn đã chọn thanh toán kiểu ${selectedPaymentMethod}` : 'Bạn chưa chọn phương thức thanh toán'}</p>
                            </div>
                        </div>

                        <div className="flex justify-between mt-6">
                            <a href="/cart" className="text-blue-500">Quay lại giỏ hàng</a>
                            <button type="submit" className={`bg-blue-500 text-white p-2 rounded ${hasErrors || !selectedPaymentMethod ? 'opacity-60 cursor-not-allowed' : ''}`}>Hoàn tất đơn hàng</button>
                        </div>
                    </form>
                </div>

                {/* Div phải - Danh sách sách đang mua */}
                <div className="w-1/2 p-4">
                    <h2 className="text-lg font-semibold mb-4">Danh sách sản phẩm</h2>
                    <ul className="space-y-4">
                        {/* Map qua các sách đang mua */}
                        <ListBooks books={detailOrderStore?.detailOrders?.map((detailCart) => {
                            const book: IBook = { id: detailCart.bookId.id, image: detailCart.bookId.imageURL, title: detailCart.bookId.title, salePrice: detailCart.bookId.salePrice };
                            return book;
                        }) || [] as IBook[]} />
                    </ul>

                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <span>Tạm tính</span>
                        <span>{orderStore?.orders[0]?.totalPrice}đ</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Phí vận chuyển</span>
                        <span>0đ</span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between font-semibold">
                        <span>Tổng cộng</span>
                        <span>{orderStore?.orders[0]?.totalPrice}đ</span>
                    </div>
                </div>
                <Modal
                    isOpen={isModalOpen}
                    modalMessage={modalMessage}
                    onClose={handleModal}
                />
            </div>

        </Container>
    );
});

export default Payment;

