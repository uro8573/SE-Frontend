
'use client';

import Image from "next/image"
import { LoginForm } from "@/components/loginForm"

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";



export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                alert("Login Fail")
                setError("Email or password is incorrect.");
            } else {
                alert("Login success");
                router.push("/");
                router.refresh();
            }
        } catch (err) {
            alert("Please check your Email and Password");
            console.error("Login error:", err);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <main className="relative w-full h-screen flex flex-row overflow-auto bg-[#0C0C0C] text-white">
            <div className="relative w-1/2 h-full">
                
                <div className="absolute top-6 right-6 z-20">
                    
                </div>
                <div className="absolute mx-11 top-5 z-20">
                   
                </div>
            </div>


            <div className="w-1/2 h-full flex flex-col px-[153px] py-[122px]">
                <h1 className="text-[64px] font-bold mb-2">Welcome Back</h1>
                <div className="text-[15px] flex items-center gap-2">
                    Don&apos;t have an account?
                    
                </div>

                <form onSubmit={handleLogin} 
                className="flex flex-col gap-6 mt-14">
                    <div className="flex flex-row w-full gap-4">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full h-[72px] px-4 py-3 rounded-md bg-white/20 border border-white/30 placeholder-white/70"
                        />
                    </div>

                    <div className="flex flex-row w-full gap-4">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full h-[72px] px-4 py-3 rounded-md bg-white/20 border border-white/30 placeholder-white/70"
                        />
                    </div>

                    <div className="flex flex-row items-center gap-3">
                        <input
                            type="checkbox"
                            id="remember"
                            className="accent-white w-5 h-5"
                        />
                        <label htmlFor="remember" className="text-sm">Remember me</label>
                    </div>

                    {error && <p className="text-red-400 text-sm -mt-2">{error}</p>}

                    <button
                        type="submit"
                        className="text-[20px] mt-4 h-[72px] bg-white text-black font-semibold py-3 rounded-md hover:bg-gray-100 transition-all"
                    >
                        Sign in
                    </button>

                    <div className="flex items-center w-full gap-4 text-white text-sm mt-6">
                        <div className="flex-grow h-px bg-white/30"></div>
                        <span className="whitespace-nowrap">Or login with</span>
                        <div className="flex-grow h-px bg-white/30"></div>
                    </div>

                    <div className="flex items-center w-full gap-4 text-white text-sm">
                        
                       
                    </div>
                </form>
            </div>
        </main>
    );
}

 

