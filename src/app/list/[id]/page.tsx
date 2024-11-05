'use client';
import Modal from "@/components/molecules/Modal";
import ListBooks from "@/components/organisms/ListBooks";
import { useDetailBook, useDetailOrder } from "@/contexts/AppContext";
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
    const detailOrderStore = useDetailOrder();
    const { id } = params;

    const [detailBook, setDetailBook] = useState({} as IDetailBook);
    const [relatedBooks, setRelatedBooks] = useState([] as IBook[]);
    const [numOfBooks, setNumOfBooks] = useState(1);
    const [modalMessage, setModalMessage] = useState('Có lỗi xảy ra');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const res_detailbook = await detailBookStore?.getDetailBook(id);
            // console.log(res_detailbook);
            if (res_detailbook) {
                if (res_detailbook.detailBook) {
                    setDetailBook(res_detailbook.detailBook);
                }
                if (res_detailbook.listBooks) {
                    setRelatedBooks(res_detailbook.listBooks);
                }
            }
        }
        fetchData();
    }, [detailBookStore]);

    const minusNumOfBooks = () => {
        if (numOfBooks > 1) setNumOfBooks(numOfBooks - 1);
    }
    const plusNumOfBooks = () => {
        setNumOfBooks(numOfBooks + 1);
    }

    const handleAddCart = async () => {
        if (detailBook.quantity >= numOfBooks) {
            const result = await detailOrderStore?.postDetailCart(detailBook.id, detailBook.salePrice * numOfBooks, numOfBooks, detailBook.quantity);
            if (result) {
                setModalMessage(result.message);
                setIsModalOpen(true);
            }
        }
        else {
            setModalMessage('Số lượng vượt quá số lượng sách hiện có');
            setIsModalOpen(true);
            setNumOfBooks(detailBook.quantity);
        }
    }

    //handleModal
    const handleModal = async () => {
        setIsModalOpen(false);
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
                    <p className="mb-2">Tác giả: {detailBook.authors && detailBook.authors.map((author, index) => (<Link href={`/detailAuthor/${author.id}`} key={index}><span className="hover:underline">{author.authorName};</span></Link>))}</p>
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
                            onChange={(e) => setNumOfBooks(parseInt(e.target.value) | 1)}
                            min="1"
                        />
                        <button className="px-4 py-2 bg-gray-400 rounded-e-lg" onClick={plusNumOfBooks}>+</button>
                        <button className="ml-4 px-6 py-2 bg-blue-600 text-white" onClick={handleAddCart}>
                            Thêm vào giỏ
                        </button>
                    </div>

                    {/* Thể loại sách */}
                    <div className="flex flex-wrap">
                        <p>Danh mục:
                            {detailBook.categories && detailBook.categories.map((category: string, index: number) => (
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
            <Modal
                isOpen={isModalOpen}
                modalMessage={modalMessage}
                onClose={handleModal}
            />
        </div >
    );
}

export default BookDetail;
