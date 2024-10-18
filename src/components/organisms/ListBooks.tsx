import React from "react";
import { useBook } from "@/contexts/AppContext";
import Link from "next/link";
import { observer } from "mobx-react-lite";

const ListBooks = observer(() => {
    const bookStore = useBook();
    return (
        <>
            {bookStore?.books && bookStore?.books.length > 0 ? (
                bookStore?.books.map((book) => (
                    <Link href={`/books/${book.id}`} key={book.id}>
                        <div className="border rounded-lg p-4 cursor-pointer hover:shadow-lg text-center">
                            <img src={book.image} alt={book.title} className="w-full h-80 mx-auto mb-4" />
                            <h3 className="text-lg font-bold mb-2">{book.title}</h3>
                            <p className="text-gray-700">{book.salePrice}</p>
                        </div>
                    </Link>
                ))
            ) : (
                <p>Đang tải...</p>
            )}
        </>
    );
});

export default ListBooks;