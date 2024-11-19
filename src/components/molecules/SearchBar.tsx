'use client';

import { useBook } from "@/contexts/AppContext";
import { useEffect, useRef, useState } from "react";
import Pagination from "./Pagination";
import { IBook } from "@/stores/bookStore";
import Link from "next/link";

const SearchBar = () => {
    const bookStore = useBook();
    const [books, setBooks] = useState([] as IBook[]);
    const [totalBook, setTotalBook] = useState(1);
    const [inputValue, setInputValue] = useState('');
    const [inputValueCreated, setInputValueCreated] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const handleClick = async () => {
        if (inputValue.trim()) {
            setInputValueCreated(inputValue.trim());
            const result = await bookStore?.getBookByName(inputValue.trim(), currentPage);
            if (result) {
                if (result.listBooks) {
                    setBooks(result.listBooks);
                    setShowResults(true);
                }
                if (result.totalBook) {
                    setTotalBook(result.totalBook);
                }
            }
        } else {
            setBooks([]);
            setShowResults(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Close the search results when clicking outside the component
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={searchRef}>
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-4 py-2">
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="bg-transparent focus:outline-none w-64"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button className="ml-2 text-orange-600" onClick={handleClick}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12.9 14.32a7.5 7.5 0 111.415-1.414l4.387 4.386a1 1 0 11-1.414 1.415l-4.388-4.387zM13.5 8.5a5 5 0 11-10 0 5 5 0 0110 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            {showResults && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[300%] bg-gray-100 border border-gray-300 rounded-lg shadow-lg z-10">
                    <p className="ml-4 my-4"> Kết quả tìm kiếm cho: {inputValueCreated}</p>
                    <hr></hr>
                    <div className="grid grid-cols-4 gap-4">
                        {books && books.length > 0 ? (
                            books.map((book) => (
                                <Link href={`/list/${book.id}`} key={book.id}>
                                    <div className="border rounded-lg p-4 cursor-pointer hover:shadow-lg text-center">
                                        <img src={book.image} alt={book.title} className="w-full h-80 mx-auto mb-4" />
                                        <h3 className="text-lg font-bold mb-2">{book.title}</h3>
                                        <p className="text-gray-700">{book.salePrice}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="ml-4 mt-4">Không có cuốn nào.</p>
                        )}
                    </div>
                    <div className="flex justify-center mt-4 mb-4">
                        <Pagination setPagination={handlePageChange} totalBook={totalBook} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
