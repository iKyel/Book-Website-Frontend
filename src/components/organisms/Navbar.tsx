import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="bg-orange-600 text-white">
      {/* Top Section */}
      <div className="container mx-auto flex justify-between items-center py-2">
        <div className="text-sm">
          CÔNG TY CỔ PHẦN XUẤT BẢN VÀ TRUYỀN THÔNG CNTT5-K62
        </div>
        <div>
          <Link href="/register" className="hover:underline">
            Đăng ký
          </Link>
          {" | "}
          <Link href="/login" className="hover:underline">
            Đăng nhập
          </Link>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white text-black py-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <Image
              src="./logo.svg" 
              alt="Logo"
              className="h-12 w-12 mr-2"
              width={48}
              height={48}
            />
            <span className="font-bold">CỬA HÀNG BÁN SÁCH TRỰC TUYẾN</span>
          </div>

          {/* Search Bar */}
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="bg-transparent focus:outline-none w-64"
            />
            <button className="ml-2 text-orange-600">
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

          {/* Cart Section */}
          <div className="flex items-center">
            <Link href="/cart" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-orange-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8h14l-2-8M7 13h10m-7 4h4"
                />
              </svg>
              <span className="ml-2">Giỏ hàng</span>
              <span className="ml-1 text-sm">(0 sản phẩm)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="bg-slate-100 text-black py-2 shadow-sm">
        <div className="container mx-auto flex justify-center space-x-8">
          <Link href="/" className="hover:text-green-600 font-semibold">
            TRANG CHỦ
          </Link>
          <Link href="/products" className="hover:text-green-600 font-semibold">
            SẢN PHẨM
          </Link>
          <Link href="/about" className="hover:text-green-600 font-semibold">
            VỀ CHÚNG TÔI
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
