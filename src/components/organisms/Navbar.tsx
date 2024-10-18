import React from "react";
import Link from "next/link";
import Image from "next/image";
import Login_Logout from "../molecules/Login_Logout";
import SearchBar from "../molecules/SearchBar";

const Navbar = () => {
  return (
    <header className="bg-orange-600 text-white">
      {/* Top Section */}
      <div className="container mx-auto flex justify-between items-center py-2">
        <div className="text-sm font-bold">
          CÔNG TY CỔ PHẦN XUẤT BẢN VÀ TRUYỀN THÔNG CNTT5-K62
        </div>
        <Login_Logout />
      </div>

      {/* Bottom Section */}
      <div className="bg-white text-black py-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="hover:underline">
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
          </Link>

          {/* Search Bar */}
          <SearchBar />

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
