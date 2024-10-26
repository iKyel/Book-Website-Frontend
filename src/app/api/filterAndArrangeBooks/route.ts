import { NextResponse } from 'next/server';
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const categories = searchParams.getAll('categories'); // Lấy mảng 'categories'
    const minPrice = searchParams.get('salePrice[min]');  // Lấy giá trị min từ salePrice
    const maxPrice = searchParams.get('salePrice[max]');  // Lấy giá trị max từ salePrice
    const min = minPrice ? parseInt(minPrice) : 0;
    const max = maxPrice ? parseInt(maxPrice) : Number.MAX_SAFE_INTEGER;
    const sortOption = searchParams.get('sortOption');    // Lấy giá trị sortOption
    const currentPage = searchParams.get('currentPage');  // Lấy giá trị currentPage


    let books: any = [];
    if (sortOption === 'newest') {
        if (categories[0] === 'Thể loại 1' && min === 0 && max === 99999) {
            books = [
                { _id: 1, title: 'Sách 1', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            ]
            return NextResponse.json(books, { status: 200 });
        }
        if (categories[0] === 'Thể loại 2' && min === 0 && max === 99999) {
            books = [
                { _id: 2, title: 'Sách 2', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            ]
            return NextResponse.json(books, { status: 200 });
        }
        if (categories[0] === 'Thể loại 1' && categories[1] === 'Thể loại 2') {
            books = [
                { _id: 3, title: 'Sách 3', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            ]
            return NextResponse.json(books, { status: 200 });
        }
        books = [
            { _id: '4', title: 'Sách 4', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
        ]
        return NextResponse.json(books, { status: 200 });

    }
    else if (sortOption === 'oldest') {
        const books = [
            { _id: 10, title: 'Sách 10', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 9, title: 'Sách 9', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 8, title: 'Sách 8', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 7, title: 'Sách 7', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 6, title: 'Sách 6', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 5, title: 'Sách 5', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 4, title: 'Sách 4', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 3, title: 'Sách 3', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 2, title: 'Sách 2', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 1, title: 'Sách 1', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
        ]
        return NextResponse.json(books, { status: 200 });
    }
    else if (sortOption === 'a-z') {
        const books = [
            { _id: 1, title: 'Sách 1', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 10, title: 'Sách 10', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 11, title: 'Sách 11', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 12, title: 'Sách 10', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 13, title: 'Sách 12', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 14, title: 'Sách 13', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 15, title: 'Sách 14', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 16, title: 'Sách 15', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 17, title: 'Sách 16', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 18, title: 'Sách 17', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 19, title: 'Sách 18', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 20, title: 'Sách 19', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 2, title: 'Sách 2', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 3, title: 'Sách 3', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 4, title: 'Sách 4', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 5, title: 'Sách 5', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 6, title: 'Sách 6', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 7, title: 'Sách 7', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 8, title: 'Sách 8', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 9, title: 'Sách 9', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
        ]
        return NextResponse.json(books, { status: 200 });
    }
    else if (sortOption === 'z-a') {
        const books = [
            { _id: 9, title: 'Sách 9', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 8, title: 'Sách 8', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 7, title: 'Sách 7', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 6, title: 'Sách 6', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 5, title: 'Sách 5', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 4, title: 'Sách 4', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 3, title: 'Sách 3', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 2, title: 'Sách 2', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 10, title: 'Sách 10', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 1, title: 'Sách 1', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
        ]
        return NextResponse.json(books, { status: 200 });
    }
    else if (sortOption === 'best-seller') {
        const books = [
            { _id: 5, title: 'Sách 5', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 4, title: 'Sách 4', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 9, title: 'Sách 9', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 2, title: 'Sách 2', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 1, title: 'Sách 1', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 3, title: 'Sách 3', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 10, title: 'Sách 10', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 7, title: 'Sách 7', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 6, title: 'Sách 6', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
            { _id: 8, title: 'Sách 8', salePrice: 150000, image: 'https://product.hstatic.net/200000343865/product/biet-doi-ngoi-sao_tap-2_bia_894ab807508c4304b365b810ceafbdf4_master.jpg' },
        ]
        return NextResponse.json(books, { status: 200 });
    }
    else {
        return NextResponse.json({ message: "Không tìm được sách để sắp xếp" }, { status: 400 });
    }
}