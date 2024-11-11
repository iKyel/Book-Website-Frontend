'use client'

import Modal from '@/components/molecules/Modal';
import Container from '@/components/organisms/Container';
import ListBooks from '@/components/organisms/ListBooks';
import { useDetailOrder, useOrder, useUser } from '@/contexts/AppContext';
import { IBook } from '@/stores/bookStore';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Ward {
    Code: string;
    FullName: string;
    DistrictCode: string;
}

interface District {
    Code: string;
    FullName: string;
    ProvinceCode: string;
    Ward: Ward[];
}

interface Province {
    Code: string;
    FullName: string;
    District: District[];
}

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

    useEffect(() => {
        // Fetch data từ file JSON
        fetch('/vietnamese_provinces.json')
            .then((response) => response.json())
            .then((data: Province[]) => {
                setProvinces(data);
            });
    }, []);

    //handleApprove
    const handleApprove = (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
            console.log("Transaction completed by " + details.payer.name.given_name)
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

        if (modalMessage === 'Đặt hàng thành công!') {
            router.push(`/completedPayment/${orderStore?.cart[0]?.id}`);
        }
    }

    // state tỉnh, phường, xã
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [selectedWard, setSelectedWard] = useState<string | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

    // handleProvinceChange
    const handleProvinceChange = (provinceCode: string) => {
        console.log(provinceCode);
        setSelectedProvince(provinceCode);
        const province = provinces.find((p) => p.FullName === provinceCode);
        setDistricts(province ? province.District : []);
        setSelectedDistrict(null);
        setWards([]);
    };

    // handleDistrictChange
    const handleDistrictChange = (districtCode: string) => {
        console.log(districtCode);
        setSelectedDistrict(districtCode);
        const district = districts.find((d) => d.FullName === districtCode);
        setWards(district ? district.Ward : []);
    };

    // handleWardChange
    const handleWardChange = (wardCode: string) => {
        console.log(wardCode);
        setSelectedWard(wardCode);
    }

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
            const addressRegex = /^[a-zA-Z0-9À-ỹ\s,/]{1,50}$/;
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
            const address = `${form.address}, ${selectedWard}, ${selectedDistrict}, ${selectedProvince}`;
            const result = await orderStore?.completeOrder(orderStore.cart[0].id, selectedPaymentMethod, form.phoneNumber, address);
            if (result && result.message) {
                setModalMessage(result.message);
                setIsModalOpen(true);
            }
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
                                    value={selectedProvince || ''}
                                    onChange={(e) => handleProvinceChange(e.target.value)}
                                    className="w-full border border-gray-300 rounded p-2"
                                    required
                                >
                                    <option value="">Chọn Tỉnh/Thành phố</option>
                                    {provinces.map((province) => (
                                        <option key={province.Code} value={province.FullName}>
                                            {province.FullName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1">
                                <label className="block mb-1">Quận/Huyện</label>
                                <select
                                    onChange={(e) => handleDistrictChange(e.target.value)}
                                    value={selectedDistrict || ''}
                                    disabled={!selectedProvince}
                                    className="w-full border border-gray-300 rounded p-2"
                                    required
                                >
                                    <option value="">Chọn Quận/Huyện</option>
                                    {districts.map((district) => (
                                        <option key={district.Code} value={district.FullName}>
                                            {district.FullName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1">
                                <label className="block mb-1">Phường/Xã</label>
                                <select
                                    onChange={(e) => handleWardChange(e.target.value)}
                                    value={selectedWard || ''}
                                    disabled={!selectedDistrict}
                                    className="w-full border border-gray-300 rounded p-2"
                                    required
                                >
                                    <option value="">Chọn Phường/Xã</option>
                                    {wards.map((ward) => (
                                        <option key={ward.Code} value={ward.FullName}>
                                            {ward.FullName}
                                        </option>
                                    ))}
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
                                                        value: `${Math.round(((orderStore?.cart[0]?.totalPrice || 0) / 24000) * 100) / 100}`
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
                        {detailOrderStore &&
                            detailOrderStore.detailCarts.map((item, index) => (
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
                    </ul>

                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <span>Tạm tính</span>
                        <span>{orderStore?.cart[0]?.totalPrice.toLocaleString() || 0}đ</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Phí vận chuyển</span>
                        <span>0đ</span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between font-semibold">
                        <span>Tổng cộng</span>
                        <span>{orderStore?.cart[0]?.totalPrice.toLocaleString() || 0}đ</span>
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

