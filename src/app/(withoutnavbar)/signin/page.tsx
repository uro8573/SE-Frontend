'use client';

import Image from "next/image"
import LoginForm from "@/components/auth/loginForm"
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginImage from "@/components/auth/LoginImage";
import TopMenuAuth from "@/components/topmenu/TopMenuAuth";

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    return (
        <div>
            <TopMenuAuth/>
            <div className="flex min-h-screen flex-col md:flex-row pt-8 md:pt-0">
                {/* Left Column - Login Form */}
                <div className="flex w-full flex-col justify-center items-center px-6 py-12 md:w-1/2 md:px-12 lg:px-16 xl:px-24">
                    <div className="w-full max-w-md flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-h3-heading text-primary-dark">Welcome Back</h1>
                            <p className="text-p3-paragraphy-small text-primary-dark">Login to your TungTEE888 account</p>
                        </div>
                        <LoginForm />
                    </div>
                </div>

                {/* Right Column - Image */}
                <LoginImage ImgSrc="/res/img/home/banner.jpg" ImgAlt="Banner Image"/>
            </div>
        </div>
    );
}
