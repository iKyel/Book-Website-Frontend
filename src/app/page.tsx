'use client';
import React, { useEffect, useState } from 'react';
import Container from '../components/organisms/Container';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();
  const [sort, setSort] = useState('newest');



  const handleWatchMore = () => {
    console.log('clickButton');
    setSort('az');
    router.push('/list');
  }

  return (

    <Container>
      <div className="flex">
        Home
      </div>
      <div className="flex justify-center mb-8">
        <button className="bg-blue-400 text-white  px-16 py-2 rounded-lg hover:bg-blue-600" onClick={handleWatchMore}>
          Xem thêm
        </button>
      </div>
    </Container>
  );
}

export default HomePage;
