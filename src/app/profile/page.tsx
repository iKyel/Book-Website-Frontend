import Sidebar from "@/components/Sidebar";
import Container from "@/components/Container";
import React from "react";

const ProfilePage = () => {
  return (
    <Container>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Profile */}
        <section className="w-3/4 pt-4 pl-12">
          <h3 className="text-xl font-bold mb-4">THÔNG TIN TÀI KHOẢN</h3>
          <div className="space-y-4">
            <div>
              <span className="font-semibold">Họ tên:</span>{" "}
              <span className="bg-gray-300 rounded-md px-4 py-1">
                Tên người dùng
              </span>
            </div>
            <div>
              <span className="font-semibold">Tên đăng nhập:</span>{" "}
              <span className="bg-gray-300 rounded-md px-4 py-1">username</span>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
};

export default ProfilePage;
