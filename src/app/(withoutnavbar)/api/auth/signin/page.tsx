'use client';

import Image from "next/image"
import LoginForm from "@/components/loginForm"

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginImage from "@/components/LoginImage";



export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    return (
        <div>
        <div className="flex min-h-screen flex-col md:flex-row ">
            {/* Left Column - Login Form */}
            <div className="flex w-full flex-col justify-center px-6 py-12 md:w-1/2 md:px-12 lg:px-16 xl:px-24">
                <div className="mx-auto w-full max-w-md">
                {/* Logo */}
                <div className="mb-8">
                    <div className="h-10 w-10 rounded-full border-2 border-black p-1">
                    <div className="h-full w-full rounded-full bg-white">
                        <div className="relative h-full w-full">
                        <div className="absolute left-1/2 top-0 h-1/2 w-[2px] -translate-x-1/2 bg-black"></div>
                        <div className="absolute left-0 top-1/2 h-[2px] w-1/2 -translate-y-1/2 bg-black"></div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Heading */}
                <div className="mb-8 space-y-2">
                    <h1 className="text-[40px] font-bold tracking-tight text-[#0A0C10]">Welcome Back</h1>
                    <p className="text-lg text-[#0A0C10]">Login to your TungTEE888 account</p>
                </div>

                {/* Login Form Component */}
                <LoginForm />
                </div>
            </div>

            {/* Right Column - Image */}
            <LoginImage ImgSrc="/img/hotel.png" ImgAlt="Modern living room interior"/>
        </div>
    </div>
    );
}

 

