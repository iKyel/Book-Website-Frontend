import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const arrangeType = await request.json();
    if (arrangeType === 'new') {
        console.log("Đang ở sắp xếp sách mới");
        const books = [
            { id: 1, title: 'Sách 1', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 2, title: 'Sách 2', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 3, title: 'Sách 3', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 4, title: 'Sách 4', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 5, title: 'Sách 5', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 6, title: 'Sách 6', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 7, title: 'Sách 7', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 8, title: 'Sách 8', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 9, title: 'Sách 9', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 10, title: 'Sách 10', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
        ]
        return NextResponse.json(books, { status: 200 });
    }
    else if (arrangeType === 'bestseller') {
        const books = [
            { id: 10, title: 'Sách 10', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 9, title: 'Sách 9', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 8, title: 'Sách 8', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 7, title: 'Sách 7', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 6, title: 'Sách 6', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 5, title: 'Sách 5', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 4, title: 'Sách 4', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 3, title: 'Sách 3', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 2, title: 'Sách 2', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 1, title: 'Sách 1', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
        ]
        return NextResponse.json(books, { status: 200 });
    }
    else {
        return NextResponse.json({ message: "Không tìm được sách để sắp xếp" }, { status: 400 });
    }

}
