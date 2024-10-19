import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { searchName } = await request.json();
    if (searchName === "a") {
        const books = [
            { id: 1, title: 'Sách 1', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 2, title: 'Sách 2', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 3, title: 'Sách 3', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 4, title: 'Sách 4', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
        ]
        return NextResponse.json(books, { status: 200 });
    }
    else if (searchName === "b") {
        const books = [
            { id: 2, title: 'Sách 2', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
        ]
        return NextResponse.json(books, { status: 200 });
    }
    else if (searchName === "ab") {
        const books = [
            { id: 3, title: 'Sách 3', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
        ]
        return NextResponse.json(books, { status: 200 });
    }
    else {
        return NextResponse.json({ message: 'Không có sách đâu' }, { status: 200 });
    }

}
