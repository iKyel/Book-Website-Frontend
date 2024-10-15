'use client';

import Sidebar from "@/components/organisms/Sidebar";
import Container from "@/components/organisms/Container";
import React from "react";
import { useUser } from "@/contexts/AppContext";

const Change_Password = () => {
    const userStore = useUser();
    return (
        <Container>
            <div className="min-h-screen flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Change Password */}
                <div className="w-3/4 flex justify-center p-4">
                    <div className="w-1/2">
                        <h2 className="text-2xl font-bold mb-6">Đổi mật khẩu</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="oldPassword" className="block text-sm font-medium mb-1">
                                    Mật khẩu cũ
                                </label>
                                <input
                                    type="password"
                                    id="oldPassword"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
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
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                                    Xác nhận mật khẩu mới
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
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