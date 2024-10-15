import React from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link từ next/link

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        <div>
          <h2 className="text-lg font-bold">INNOVATIVE PUBLISHING AND MEDIA</h2>
          <p>Số 110 Nguyễn Ngọc Nại, Khương Mai, Thanh Xuân, Hà Nội</p>
          <p>Hotline: 03 2838 3979</p>
          <p>Email: online.ipmvn@gmail.com</p>
          <p>Giấy phép DKDD số 0101507251, cấp lần thứ 6 năm 2019</p>
        </div>
        <div className="mt-4 md:mt-0">
          <h3 className="font-bold">KẾT NỐI VỚI CHÚNG TÔI</h3>
          <p>CÁC KÊNH KHÁC</p>
          <div className="flex space-x-2">
            <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <Image src="./facebook.svg" alt="Facebook" width={24} height={24} />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Image src="./twitter.svg" alt="Twitter" width={24} height={24} />
            </Link>
            <Link href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <Image src="./youtube.svg" alt="YouTube" width={24} height={24} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
