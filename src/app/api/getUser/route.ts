import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const user = {
        userName: "hoang",
        fullName: "Hoang"
    }
    if (user)
        return NextResponse.json({ message: 'Đăng nhập thành công', user: user }, { status: 200 });

    else {
        return NextResponse.json({ message: 'Tài khoản hoặc mật khẩu không chính xác' }, { status: 401 });
    }

}
