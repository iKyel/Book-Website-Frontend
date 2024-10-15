'use client';

import Sidebar from "@/components/organisms/Sidebar";
import Container from "@/components/organisms/Container";
import React, { useState } from "react";
import { useUser } from "@/contexts/AppContext";

const Change_Password = () => {
    const userStore = useUser();

    const [form, setForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [errors, setErrors] = useState({
        confirmNewPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });

        // Validation
        if (name === 'confirmNewPassword' || name === 'newPassword') {
            setErrors({
                ...errors,
                confirmNewPassword: value === form.newPassword ? '' : 'Nhập lại mật khẩu không khớp'
            });
        }
    };

    //Check Errors
    const hasErrors = Object.values(errors).some((error) => error !== '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await userStore.changePassword(form.oldPassword, form.newPassword);


    }

    return (
        <Container>
            <div className="min-h-screen flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Change Password */}
                <div className="w-3/4 flex justify-center p-4">
                    <div className="w-1/2">
                        <h2 className="text-2xl font-bold mb-6">Đổi mật khẩu</h2>

                        <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="oldPassword" className="block text-sm font-medium mb-1">
                                    Mật khẩu cũ
                                </label>
                                <input
                                    type="password"
                                    id="oldPassword"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    onChange={handleChange}
                                    name="oldPassword"
                                    value={form.oldPassword}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                                    Mật khẩu mới
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    onChange={handleChange}
                                    name="newPassword"
                                    value={form.newPassword}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="confirmNewPassword" className="block text-sm font-medium mb-1">
                                    Xác nhận mật khẩu mới
                                </label>
                                <input
                                    type="password"
                                    id="confirmNewPassword"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    onChange={handleChange}
                                    name="confirmNewPassword"
                                    value={form.confirmNewPassword}
                                    required
                                />
                                {errors.confirmNewPassword && (
                                    <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors ${hasErrors ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Đặt lại mật khẩu
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Change_Password;