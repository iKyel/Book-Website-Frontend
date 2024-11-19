'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useBook } from '@/contexts/AppContext';
import { IBook } from '@/stores/bookStore';
import { useRouter } from 'next/navigation';
import ListBooks from '@/components/organisms/ListBooks';
import Banner from '@/components/organisms/Banner';

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState('newest');
  const [books, setBooks] = useState([] as IBook[]);
  const bookStore = useBook()!;
  const router = useRouter();
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    const fetchData = async () => {
      const result = await bookStore?.getFilterandArrangeBooks([], { min: 0, max: Number.MAX_SAFE_INTEGER }, selectedTab, 1);
      if (result && result.listBooks) {
        const allBooks: IBook[] = Array.isArray(result.listBooks) ? result.listBooks : [];
        // console.log(allBooks, "allBooks");
        if (allBooks) setBooks(allBooks.slice(0, 6));
      }
    }
    fetchData();
  }, [selectedTab]);

  const handleWatchMore = () => {
    setSort(selectedTab);
    router.push('/list');
  }

  return (
    <div className="w-full">
      {/* Banner */}
      <Banner />

      {/* Nav */}
      <div className="flex justify-center mb-8">
        <div className="w-1/2 border-2 border-slate-300 py-2 flex justify-evenly">
          <button
            className={`text-lg font-semibold ${selectedTab === 'newest' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setSelectedTab('newest')}
          >
            SÁCH MỚI
          </button>
          |
          <button
            className={`text-lg font-semibold ${selectedTab === 'best-seller' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setSelectedTab('best-seller')}
          >
            SÁCH BÁN CHẠY
          </button>
        </div>
      </div>

      {/* Danh sách sách */}
      <div className='mx-60'>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-12 mb-8">
          <ListBooks books={books} />
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
