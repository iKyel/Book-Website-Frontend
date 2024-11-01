import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
    const order = {
        _id: '1',
        userId: '67209b371a4ee4fc149f6354',
        orderStatus: 'Cart',
        paymentType: 'COD',
        totalPrice: 450000,
        phoneNumber: '',
        address: '',
    }

    const orderDetail = [
        { _id: '1', orderId: '1', bookId: { _id: '670df7988b93bdf19e8f5447', title: 'Sống mãi với thủ đô', salePrice: 500000, imageURL: 'https://firebasestorage.googleapis.com/v0/b/bookstore-backend-a40e9.appspot.com/o/images%2Fsong-mai-voi-thu-do.jpeg?alt=media&token=7d92745f-efd4-48c9-a56b-76bcaa4b559d' }, quantity: 12, price: 100000 },
        { _id: '2', orderId: '1', bookId: { _id: '670e789dcf394d146bea8973', title: 'Kể chuyện Thăng Long - Hà Nội - Danh nhân Hà Nội', salePrice: 200000, imageURL: 'https://firebasestorage.googleapis.com/v0/b/bookstore-backend-a40e9.appspot.com/o/images%2Fke-chuyen-thang-long-ha-noi_danh-nhan-ha-noi.jpeg?alt=media&token=db9da1a4-03ec-4b7d-b30c-a79e96af4729' }, quantity: 12, price: 120000 },
    ]

    if (order && orderDetail) {
        return NextResponse.json({ order, orderDetail }, { status: 200 });
    }
    else {
        return NextResponse.json({ message: 'Không lấy được thông tin giỏ hàng' }, { status: 401 });
    }

}