import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const detailBook = {
        _id: 1,
        title: "title",
        publisher: "Nha xuat ban",
        salePrice: 100000,
        authors: ['hoang', 'Hoang'],
        categories: ['The loai 1', 'The loai 2'],
        quantity: 2,
        publishedYear: 2024,
        size: "5*10",
        coverForm: "giấy",
        content: "11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
        imageURL: "https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg"
    }
    const listBooks = [
        { id: 1, title: 'Sách 1', salePrice: 150000, imageURL: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
        { id: 2, title: 'Sách 2', salePrice: 150000, imageURL: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
        { id: 3, title: 'Sách 3', salePrice: 150000, imageURL: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
    ]

    if (!detailBook) {
        return NextResponse.json({ message: 'Không tìm thấy sách' }, { status: 404 });
    }

    return NextResponse.json({ detailBook, listBooks }, { status: 200 });
}