'use client';

import Modal from '@/components/molecules/Modal';
import { useUser } from '@/contexts/AppContext';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Register: React.FC = () => {
  const router = useRouter();
  const userStore = useUser();

  const [form, setForm] = useState({
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    userName: '',
    confirmPassword: '',
  });

  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    // Validation
    if (name === 'fullName') {
      const usernameRegex = /^[a-zA-Z0-9À-ỹ ]*$/;
      setErrors({
        ...errors,
        fullName: usernameRegex.test(value) && value.length >= 4 && value.length <= 50
          ? ''
          : 'Chỉ có thể dùng chữ, số, dấu cách và trong khoảng 4 đến 50 kí tự',
      });
    }

    if (name === 'userName') {
      const usernameRegex = /^[a-z0-9]*$/;
      setErrors({
        ...errors,
        userName: usernameRegex.test(value) && value.length >= 4 && value.length <= 50
          ? ''
          : 'Chỉ có thể dùng chữ thường hoặc số và trong khoảng 4 đến 50 kí tự',
      });
    }

    if (name === 'confirmPassword' || name === 'password') {
      setErrors({
        ...errors,
        confirmPassword: value === form.password ? '' : 'Nhập lại mật khẩu không khớp'
      });
    }
  };

  const handleModal = () => {
    setIsModalOpen(false);

    if (modalMessage === 'Đăng ký thành công!') {
      router.push('/login');
    }
    else if (modalMessage === 'Tên đăng nhập đã tồn tại. Hãy dùng tên khác!') {
      setErrors({
        ...errors,
        userName: modalMessage
      });
    }
  }
  //Check Errors
  const hasErrors = Object.values(errors).some((error) => error !== '');

  //Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await userStore.signupUser(form.fullName, form.userName, form.password);

    setModalMessage(result.message);
    setIsModalOpen(true);

  };


  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-1/3"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Tạo tài khoản</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Họ và tên</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">Tên đăng nhập</label>
          <input
            type="text"
            name="userName"
            value={form.userName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
          {errors.userName && (
            <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700">Mật khẩu</label>
          <input
            type='password'
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />

        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700">Nhập lại mật khẩu</label>
          <input
            type='password'
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white p-2 rounded mt-4 ${hasErrors ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Đăng kí
        </button>
      </form>
      <Modal
        isOpen={isModalOpen}
        modalMessage={modalMessage}
        onClose={handleModal}
      />
    </div>
  );
};

export default Register;
