import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { bookId, price, soLgSachThem } = await request.json();

    if (true) {
        return NextResponse.json({ message: 'Thêm thành công' }, { status: 200 });
    }
    else {
        return NextResponse.json({ message: 'Không lấy được thông tin giỏ hàng' }, { status: 401 });
    }

}
