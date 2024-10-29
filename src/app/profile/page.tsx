'use client';

import Sidebar from "@/components/organisms/Sidebar";
import Container from "@/components/organisms/Container";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useUser } from "@/contexts/AppContext";

const ProfilePage = observer(() => {
  const userStore = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
              <span className="font-semibold">Họ tên:</span>
              {isClient && <span className="bg-gray-300 rounded-md px-4 py-1">
                {userStore?.user?.fullName}
              </span>
              }


            </div>
            <div>
              <span className="font-semibold">Tên đăng nhập:</span>
              {isClient && <span className="bg-gray-300 rounded-md px-4 py-1">{userStore?.user?.userName}</span>}

            </div>
          </div>
        </section>
      </div>
    </Container>
  );
});

export default ProfilePage;
