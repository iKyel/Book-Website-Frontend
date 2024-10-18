'use client';
import Pagination from '@/components/molecules/Pagination';
import ListBooks from '@/components/organisms/ListBooks';
import { useBook, useCategory } from '@/contexts/AppContext';
import { ICategory } from '@/stores/categoryStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

const ListPage = observer(() => {
  const bookStore = useBook();
  const categoryStore = useCategory();

  const [categories, setCategories] = useState([] as ICategory[]);
  const [selectedPrice, setSelectedPrice] = useState({ min: 0, max: Number.MAX_SAFE_INTEGER });
  const [selectedCategories, setSelectedCategories] = useState([] as string[]);
  const [sortOption, setSortOption] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const salePrice = [
    { id: 'price1', min: 0, max: Number.MAX_SAFE_INTEGER, name: 'Tất cả' },
    { id: 'price2', min: 0, max: 99999, name: 'Dưới 100,000đ' },
    { id: 'price3', min: 100000, max: 200000, name: '100,000đ - 200,000đ' },
    { id: 'price4', min: 200000, max: 300000, name: '200,000đ - 300,000đ' },
    { id: 'price5', min: 300000, max: Number.MAX_SAFE_INTEGER, name: 'Trên 300,000đ' },
  ];
  useEffect(() => {
    const receivedData = localStorage.getItem('getSortOption');
    if (receivedData) {
      setSortOption(receivedData);
      localStorage.removeItem('getSortOption');
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      console.log(sortOption);
      await bookStore?.getFilterandArrangeBooks(selectedCategories, selectedPrice, sortOption, currentPage);
      if (categoryStore?.categories) { setCategories(categoryStore?.categories); }
    }

    fetchData();
  }, [sortOption, selectedCategories, selectedPrice, currentPage, categoryStore, bookStore]);

  //handleCategoryChange
  const handleCategoryChange = (category: string) => {
    if (category) {
      setSelectedCategories((prev: string[]) => {
        return prev.includes(category) ? prev.filter((item: string) => item !== category) : [...prev, category]
      });
    }
  };

  //handlePriceChange
  const handlePriceChange = (price: { min: number, max: number }) => {
    setSelectedPrice({ min: price.min, max: price.max });
  };

  //handleSortTypeChange
  const handleSortTypeChange = (sortType: string) => {
    setSortOption(sortType);
  };

  //handlePageChange
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  return (
    <div className="flex">
      {/* Bên trái */}
      <div className="w-1/4 p-4 border-r sticky top-0 h-screen overflow-y-auto ml-10">
        {/* Khoảng giá */}
        <div className="py-2 mb-4">
          <h3 className="font-bold text-lg mb-2">KHOẢNG GIÁ</h3>
          <div className='border rounded p-2'>
            {salePrice.map((price) => (
              <div key={price.id}>
                <input
                  type="radio"
                  id={price.id}
                  name="price"
                  value={price.name}
                  checked={price.min === selectedPrice.min && price.max === selectedPrice.max}
                  onChange={() => handlePriceChange({ min: price.min, max: price.max })}
                  className="mr-2"
                />
                <label htmlFor={price.id}>{price.name}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Thể loại */}
        <div>
          <h3 className="font-bold text-lg mb-2">THỂ LOẠI</h3>
          <div className="h-60 overflow-y-auto border rounded p-2">
            {categories.length > 0 ? (categories.map((category) => (
              <div key={category.id}>
                <input
                  type="checkbox"
                  id={category.id}
                  value={category.categoryName}
                  checked={selectedCategories.includes(category.categoryName)}
                  onChange={() => handleCategoryChange(category.categoryName)}
                  className="mr-2"
                />
                <label htmlFor={category.id}>{category.categoryName}</label>
              </div>
            ))) : (<p>Đang tải...</p>)}
          </div>
        </div>
      </div>

      <div className="w-3/4 p-4">
        {/* Sắp xếp */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">Danh sách</h3>
          <select
            value={sortOption}
            onChange={(e) => handleSortTypeChange(e.target.value)}
            className="border rounded p-2"
          >
            <option value="bestseller">Bán chạy nhất</option>
            <option value="az">Từ A-Z</option>
            <option value="za">Từ Z-A</option>
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
          </select>
        </div>

        {/*Bên phải */}
        {/* Danh sách sách */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <ListBooks />
        </div>

        {/* Phân trang */}
        <div className="flex justify-center mt-8">
          <Pagination setPagination={handlePageChange} />
        </div>
      </div>
    </div>
  );
});

export default ListPage;