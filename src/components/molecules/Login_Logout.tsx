'use client';
import { useUser } from "@/contexts/AppContext";
import { observer } from "mobx-react-lite";
import Link from "next/link"
import React, { useEffect, useState } from "react"


const Login_Logout = observer(() => {
    const userStore = useUser();
    const [hasUser, setHasUser] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await userStore?.getUser();
            setHasUser(true);
        }
        fetchData();
    }, [userStore]);

    return (
        <div>{hasUser
            ? (
                <div>
                    <Link href="/profile" className="hover:underline">
                        <p className="font-bold">Xin chào: {userStore?.user?.fullName}</p>
                    </Link>
                </div>
            )
            : (
                <div>
                    <Link href="/register" className="hover:underline">
                        Đăng ký
                    </Link>
                    {" | "}
                    <Link href="/login" className="hover:underline">
                        Đăng nhập
                    </Link>
                </div >)
        }
        </div >
    )
});

export default Login_Logout;