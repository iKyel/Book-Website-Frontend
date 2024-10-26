'use client';
import ListBooks from "@/components/organisms/ListBooks";
import { useAuthor, useBook, useCategory, useDetailBook } from "@/contexts/AppContext";
import { IAuthor } from "@/stores/authorStore";
import { IBook } from "@/stores/bookStore";
import { IDetailBook } from "@/stores/detailBookStore";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BookDetailProps {
    params: {
        id: string;
    };
}

const BookDetail: React.FC<BookDetailProps> = ({ params }) => {
    const detailBookStore = useDetailBook();
    const bookStore = useBook();
    const authorStore = useAuthor();
    const { id } = params;

    const [detailBook, setDetailBook] = useState({} as IDetailBook);
    const [relatedBooks, setRelatedBooks] = useState([] as IBook[]);
    const [authorsOfBook, setAuthorsOfBooks] = useState([] as IAuthor[]);
    const [numOfBooks, setNumOfBooks] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const res_detailbook: IDetailBook = await detailBookStore?.getDetailBook(id);

            if (res_detailbook) {
                const res_author = await authorStore?.getAuthorIdByAuthorName(res_detailbook.authors);
                const res_relatedBooks = await bookStore?.getFilterandArrangeBooks(res_detailbook.categories, { min: 0, max: Number.MAX_SAFE_INTEGER }, 'best-seller', 1);
                if (res_relatedBooks) setRelatedBooks(res_relatedBooks.slice(0, 3));
                if (res_author) setAuthorsOfBooks(res_author);
                setDetailBook(res_detailbook);
            }
        }
        fetchData();
    }, [id, detailBookStore]);

    const minusNumOfBooks = () => {
        if (numOfBooks > 1) setNumOfBooks(numOfBooks - 1);
    }
    const plusNumOfBooks = () => {
        setNumOfBooks(numOfBooks + 1);
    }


    return (
        <div className="w-2/3 mx-auto mt-8">
            {/* Phần trên: Chi tiết sách */}
            <div className="flex mb-8">
                {/* Hình ảnh và trạng thái */}
                <div className="w-1/3">
                    <img src={detailBook.image} alt={detailBook.title} className="w-80 h-96" />
                    <p className={`mt-2 text-center ${detailBook.quantity ? 'text-green-600' : 'text-red-600'}`}>
                        {detailBook.quantity ? 'Còn hàng' : 'Hết hàng'}
                    </p>
                </div>

                {/* Thông tin sách */}
                <div className="w-2/3 ml-8">
                    <h1 className="text-2xl font-bold mb-4">{detailBook.title}</h1>
                    <p className="text-xl text-gray-700 mb-2">{detailBook.salePrice} VND</p>
                    <p className="mb-2">Tác giả: {authorsOfBook && authorsOfBook.map((author) => (<Link href={`/detailAuthor/${author.id}`} key={author.id}><span className="hover:underline">{author.authorName};</span></Link>))}</p>
                    <p className="mb-2">Năm xuất bản: {detailBook.publishedYear}</p>
                    <p className="mb-2">Kích thước: {detailBook.size}</p>
                    <p className="mb-2">Nhà xuất bản: {detailBook.publisher}</p>
                    <p className="mb-2">Hình thức: {detailBook.coverForm}</p>
                    <p className="mb-2">Nội dung: </p>
                    <p className="w-full h-40 resize-none border border-gray-300 p-2 mb-4 break-words overflow-y-auto">{detailBook.content}</p>

                    {/* Số lượng và nút Thêm vào giỏ */}
                    <div className="flex items-center mb-4">
                        <button className="px-4 py-2 bg-gray-400 rounded-s-lg" onClick={minusNumOfBooks}>-</button>
                        <input
                            type="text"
                            className="mx-0.5 px-4 py-2 bg-gray-300 text-center w-12"
                            value={numOfBooks}
                            onChange={(e) => setNumOfBooks(parseInt(e.target.value) | 0)}
                            min="1"
                        />
                        <button className="px-4 py-2 bg-gray-400 rounded-e-lg" onClick={plusNumOfBooks}>+</button>
                        <button className="ml-4 px-6 py-2 bg-blue-600 text-white">
                            Thêm vào giỏ
                        </button>
                    </div>

                    {/* Thể loại sách */}
                    <div className="flex flex-wrap">
                        <p>Danh mục:
                            {detailBook.categories && detailBook.categories.map((category: any, index: number) => (
                                <span
                                    key={index}
                                    className="bg-gray-200 px-3 py-1 mr-2 mb-2 rounded text-bold"
                                >
                                    {category}
                                </span>
                            ))}
                        </p>

                    </div>
                </div>
            </div>

            {/* Phần dưới: Sản phẩm liên quan */}
            <div className="text-center mx-auto border-t-2 mb-8 p-8">
                <h2 className="text-xl font-bold mb-4">SẢN PHẨM LIÊN QUAN</h2>
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <ListBooks books={relatedBooks} />
                </div>
            </div>
        </div >
    );
}

export default BookDetail;
