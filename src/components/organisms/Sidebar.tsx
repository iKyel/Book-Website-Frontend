'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/AppContext';
import YesNoModel from '../molecules/YesNoModal';
import { observer } from 'mobx-react-lite';

const Sidebar = observer(() => {
  const router = useRouter()
  const userStore = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = async () => {
    const result: any = await userStore.logout();
    // const result = { message: "Đăng xuất thành công" };
    if (result) {
      router.push('/login');
    }
  }

  return (
    <div className="w-1/4 bg-gray-200 p-4">
      <h2 className="text-lg font-bold mb-6">TRANG TÀI KHOẢN</h2>
      <p className="mb-4">Xin chào, <span className="font-semibold">{userStore.user?.fullName}</span></p>
      <ul className="space-y-4">
        <li>
          <Link href="/profile" className="block bg-gray-300 py-2 px-4 rounded-md text-center">
            Thông tin tài khoản
          </Link>
        </li>
        <li>
          <Link href="/orders" className="block bg-gray-300 py-2 px-4 rounded-md text-center">
            Đơn hàng của bạn
          </Link>
        </li>
        <li>
          <Link href="/change_password" className="block bg-gray-300 py-2 px-4 rounded-md text-center">
            Đổi mật khẩu
          </Link>
        </li>
        <li>
          <a className="block bg-gray-300 py-2 px-4 rounded-md text-center" onClick={() => setIsModalOpen(true)}>
            Đăng xuất
          </a>
        </li>

        <YesNoModel
          isOpen={isModalOpen}
          modalMessage={"Bạn có muốn thoát không?"}
          onConfirm={handleModal}
          onClose={() => setIsModalOpen(false)}
        />
      </ul>
    </div>
  )
});

export default Sidebar
