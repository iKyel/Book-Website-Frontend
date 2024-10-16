'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useBook } from '@/contexts/AppContext';
import { IBook } from '@/stores/bookStore';
import { observer } from 'mobx-react-lite';

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState('new');
  const [books, setBooks] = useState([] as IBook[]);
  const bookStore = useBook()!;

  useEffect(() => {
    const fetchData = async () => {
      const allBooks: IBook[] = await bookStore?.getArrangeData(selectedTab);
      setBooks(allBooks.slice(0, 6));
    }
    fetchData();
  }, [selectedTab]);


  return (
    <div className="w-full">
      {/* Banner */}
      <div className="w-full h-76 bg-gray-300 mb-8">
        <h2 className="text-center text-3xl font-bold py-32">Banner</h2>
      </div>

      {/* Nav */}
      <div className="flex justify-center mb-8">
        <div className="w-1/2 border-2 border-slate-300 py-2 flex justify-evenly">
          <button
            className={`text-lg font-semibold ${selectedTab === 'new' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setSelectedTab('new')}
          >
            SÁCH MỚI
          </button>
          |
          <button
            className={`text-lg font-semibold ${selectedTab === 'bestseller' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setSelectedTab('bestseller')}
          >
            SÁCH BÁN CHẠY
          </button>
        </div>
      </div>

      {/* Danh sách sách */}
      <div className='mx-48'>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4 mb-8">
          {books.length > 0 ? (
            books.map((book) => (
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
        </div>



        {/* Nút Xem thêm */}
        <div className="flex justify-center mb-8">
          <Link href="/list">
            <button className="bg-blue-400 text-white  px-16 py-2 rounded-lg hover:bg-blue-600">
              Xem thêm
            </button>
          </Link>
        </div>
      </div>
    </div >
  );
};

export default HomePage;
