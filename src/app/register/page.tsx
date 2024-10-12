'use client';

import { useState } from 'react';

const Register = () => {
  const [hoTen, setHoTen] = useState('');
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [nhapLaiMatKhau, setNhapLaiMatKhau] = useState('');

  const xuLyDangKy = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý logic đăng ký tại đây
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/3">
        <h2 className="text-2xl font-semibold text-center mb-6">Tạo tài khoản</h2>
        <form onSubmit={xuLyDangKy}>
          <div className="mb-4">
            <label htmlFor="hoTen" className="block text-sm font-medium text-gray-700">
              Họ và tên
            </label>
            <input
              type="text"
              id="hoTen"
              value={hoTen}
              onChange={(e) => setHoTen(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tenDangNhap" className="block text-sm font-medium text-gray-700">
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="tenDangNhap"
              value={tenDangNhap}
              onChange={(e) => setTenDangNhap(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="matKhau" className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              id="matKhau"
              value={matKhau}
              onChange={(e) => setMatKhau(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nhapLaiMatKhau" className="block text-sm font-medium text-gray-700">
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              id="nhapLaiMatKhau"
              value={nhapLaiMatKhau}
              onChange={(e) => setNhapLaiMatKhau(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

