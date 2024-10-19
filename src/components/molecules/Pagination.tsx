// components/Pagination.js
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { IBook } from '@/stores/bookStore';

interface ChildComponentProps {
    setPagination: (data: number) => void;
    books: IBook[];
}

const Pagination = observer(({ setPagination, books }: ChildComponentProps) => {
    const totalBooks = books ? books.length : 0;
    const booksPerPage = 16;
    const totalPages = Math.ceil(totalBooks / booksPerPage);
    // const totalPages = 16;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setPagination(page);
    };

    const renderPageNumbers = () => {
        const pages = [];

        if (totalPages <= 3) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`px-4 py-2 mx-1 ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            if (currentPage >= 1) {
                pages.push(
                    <button
                        key={1}
                        onClick={() => handlePageChange(1)}
                        className={`px-4 py-2 mx-1 ${currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                    >
                        1
                    </button>
                );
            }

            if (currentPage > 2) {
                pages.push(<span key="ellipsis" className="mx-1">...</span>);
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`px-4 py-2 mx-1 ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                    >
                        {i}
                    </button>
                );
            }

            if (currentPage < totalPages - 1) {
                pages.push(<span key="ellipsis-end" className="mx-1">...</span>);
            }

            if (currentPage <= totalPages) {
                pages.push(
                    <button
                        key={totalPages}
                        onClick={() => handlePageChange(totalPages)}
                        className={`px-4 py-2 mx-1 ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                    >
                        {totalPages}
                    </button>
                );
            }
        }

        return pages;
    };

    return (
        <div className="flex justify-center mt-4">
            {renderPageNumbers()}
        </div>
    );
});

export default Pagination;
