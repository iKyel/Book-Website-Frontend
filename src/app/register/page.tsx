'use client';

import React, { useState } from 'react';

const Register: React.FC = () => {
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    // Validation
    if (name === 'username') {
      const usernameRegex = /^[a-z0-9]*$/;
      setErrors({
        ...errors,
        username: usernameRegex.test(value) ? '' : 'Chỉ có thể dùng chữ thường hoặc số',
      });
    }

    if (name === 'confirmPassword' || name === 'password') {
      setErrors({
        ...errors,
        confirmPassword: value === form.password ? '' : 'Nhập lại mật khẩu không khớp',
      });
    }
  };

  //Check Errors
  const hasErrors = Object.values(errors).some((error) => error !== '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form data:', form);
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

        <div className="mb-4">
          <label className="block text-gray-700">Tên đăng nhập</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
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
          disabled={hasErrors}
        >
          Đăng kí
        </button>
      </form>
    </div>
  );
};

export default Register;
