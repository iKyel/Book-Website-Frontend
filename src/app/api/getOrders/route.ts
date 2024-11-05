import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const mockOrders = [
        { _id: '1', createAt: "2024-11-01", orderStatus: "Đang xử lý", deliveryBrand: "Giao nhanh", totalPrice: 500000 },
        { _id: '2', createAt: "2024-11-02", orderStatus: "Hoàn tất", deliveryBrand: "Giao chuẩn", totalPrice: 300000 },
    ];
    if (mockOrders)
        return NextResponse.json({ message: 'Lấy được danh sách hóa đơn', orders: mockOrders }, { status: 200 });

    else {
        return NextResponse.json({ message: 'Lỗi không lấy được danh sách hóa đơn' }, { status: 401 });
    }

}