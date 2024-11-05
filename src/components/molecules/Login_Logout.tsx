'use client';
import { useUser } from "@/contexts/AppContext";
import { observer } from "mobx-react-lite";
import Link from "next/link"
import React from "react"


const Login_Logout = observer(() => {
    const userStore = useUser();

    return (
        <div>{userStore && userStore.user
            ? (
                <div>
                    <Link href="/profile">
                        <p >Xin chào: <span className="font-bold hover:underline">{userStore.user.fullName}</span></p>
                    </Link>
                </div>
            )
            : (
                <div>
                    <Link href="/register" className="hover:underline">
                        <span>Đăng ký</span>
                    </Link>
                    {" | "}
                    <Link href="/login" className="hover:underline">
                        <span>Đăng nhập</span>
                    </Link>
                </div >)
        }
        </div >
    )
});

export default Login_Logout;