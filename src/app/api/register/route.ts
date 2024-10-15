import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { fullName, userName, password } = await request.json();
    if (userName === "hoang" && password === "123" && fullName === "Hoang") {
        return NextResponse.json({ message: 'Đăng ký thành công' }, { status: 200 });
    }
    else if (userName === "hoang123") {
        return NextResponse.json({ message: 'Đã tồn tại người dùng có username này. Hãy dùng username khác!' }, { status: 401 });
    }
    else {
        return NextResponse.json({ message: 'Không cho đăng kí' }, { status: 500 });
    }
}