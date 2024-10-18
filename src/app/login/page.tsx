'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/AppContext';
import Modal from '@/components/molecules/Modal';

const LoginPage = () => {
  const router = useRouter();
  const userStore = useUser();
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');

  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result: any = await userStore?.loginUser(tenDangNhap, matKhau);

    if (result) {
      setModalMessage(result.message);
      setIsModalOpen(true);
    }
  };

  const handleModal = () => {
    setIsModalOpen(false);
    if (modalMessage === "Đăng nhập thành công!") {
      router.push("/profile");
    }
    setMatKhau('');
  }



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/3">
        <h2 className="text-2xl font-semibold text-center mb-6">Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Đăng nhập
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">hoặc</span>
          <button
            onClick={() => router.push('/register')}
            className="ml-1 text-sm text-blue-500 hover:underline"
          >
            Đăng kí
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        modalMessage={modalMessage}
        onClose={handleModal}
      />
    </div>
  );
};

export default LoginPage;
