import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { userName, password } = await request.json();
    if (userName === "hoang" && password === "123") {
        return NextResponse.json({ message: 'Đăng nhập thành công' }, { status: 200 });
    }
    else {
        return NextResponse.json({ message: 'Tài khoản hoặc mật khẩu không chính xác' }, { status: 201 });
    }

}
