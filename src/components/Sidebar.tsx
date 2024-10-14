import React from 'react'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <aside className="w-1/4 bg-gray-200 p-4">
      <h2 className="text-lg font-bold">TRANG TÀI KHOẢN</h2>
      <p className="mb-4">Xin chào, <span className="font-semibold">Người dùng</span></p>
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
          <Link href="/change-password" className="block bg-gray-300 py-2 px-4 rounded-md text-center">
            Đổi mật khẩu
          </Link>
        </li>
        <li>
          <Link href="/logout" className="block bg-gray-300 py-2 px-4 rounded-md text-center">
            Đăng xuất
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar
