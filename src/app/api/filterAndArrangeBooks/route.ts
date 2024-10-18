import { NextResponse } from 'next/server';
export async function POST(request: Request) {
    const { categories, salePrice, sortOption } = await request.json();
    // console.log(categories, salePrice, sortOption, "api/filterAndArrange");
    // console.log(categories[0], "categories thứ 0")
    let books: any = [];
    if (sortOption === 'newest') {
        if (categories[0] === 'Thể loại 1' && salePrice.min === 0 && salePrice.max === 99999) {
            books = [
                { id: 1, title: 'Sách 1', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            ]
            return NextResponse.json(books, { status: 200 });
        }
        if (categories[0] === 'Thể loại 2' && salePrice.min === 0 && salePrice.max === 99999) {
            books = [
                { id: 2, title: 'Sách 2', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            ]
            return NextResponse.json(books, { status: 200 });
        }
        if (categories[0] === 'Thể loại 1' && categories[1] === 'Thể loại 2') {
            books = [
                { id: 3, title: 'Sách 3', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            ]
            return NextResponse.json(books, { status: 200 });
        }
        books = [
            { id: 4, title: 'Sách 4', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
        ]
        return NextResponse.json(books, { status: 200 });

    }
    else if (sortOption === 'oldest') {
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
    else if (sortOption === 'a-z') {
        const books = [
            { id: 1, title: 'Sách 1', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 10, title: 'Sách 10', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 11, title: 'Sách 11', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 12, title: 'Sách 10', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 13, title: 'Sách 12', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 14, title: 'Sách 13', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 15, title: 'Sách 14', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 16, title: 'Sách 15', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 17, title: 'Sách 16', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 18, title: 'Sách 17', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 19, title: 'Sách 18', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 20, title: 'Sách 19', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 2, title: 'Sách 2', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 3, title: 'Sách 3', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 4, title: 'Sách 4', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 5, title: 'Sách 5', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 6, title: 'Sách 6', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 7, title: 'Sách 7', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 8, title: 'Sách 8', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 9, title: 'Sách 9', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
        ]
        return NextResponse.json(books, { status: 200 });
    }
    else if (sortOption === 'z-a') {
        const books = [
            { id: 9, title: 'Sách 9', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 8, title: 'Sách 8', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 7, title: 'Sách 7', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 6, title: 'Sách 6', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 5, title: 'Sách 5', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 4, title: 'Sách 4', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 3, title: 'Sách 3', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 2, title: 'Sách 2', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 10, title: 'Sách 10', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 1, title: 'Sách 1', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
        ]
        return NextResponse.json(books, { status: 200 });
    }
    else if (sortOption === 'best-seller') {
        const books = [
            { id: 5, title: 'Sách 5', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 4, title: 'Sách 4', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 9, title: 'Sách 9', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 2, title: 'Sách 2', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 1, title: 'Sách 1', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 3, title: 'Sách 3', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 10, title: 'Sách 10', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 7, title: 'Sách 7', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 6, title: 'Sách 6', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { id: 8, title: 'Sách 8', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
        ]
        return NextResponse.json(books, { status: 200 });
    }
    else {
        return NextResponse.json({ message: "Không tìm được sách để sắp xếp" }, { status: 400 });
    }
}