import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const categories = [
        { id: 1, categoryName: 'Thể loại 1' },
        { id: 2, categoryName: 'Thể loại 2' },
        { id: 3, categoryName: 'Thể loại 3' },
        { id: 4, categoryName: 'Thể loại 4' },
        { id: 5, categoryName: 'Thể loại 5' },
        { id: 6, categoryName: 'Thể loại 6' },
        { id: 7, categoryName: 'Thể loại 7' },
        { id: 8, categoryName: 'Thể loại 8' },
        { id: 9, categoryName: 'Thể loại 9' },
        { id: 10, categoryName: 'Thể loại 10' },
        { id: 11, categoryName: 'Thể loại 11' },
        { id: 12, categoryName: 'Thể loại 12' },
    ];

    if (categories.length > 0) {
        return NextResponse.json(categories, { status: 200 });
    }
    else {
        return NextResponse.json({ message: 'Tài khoản hoặc mật khẩu không chính xác' }, { status: 401 });
    }

}
