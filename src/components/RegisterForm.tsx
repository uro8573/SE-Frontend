"use client"

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import LoginInput from "@/components/LoginInput";
import { PasswordInput } from "@/components/passwordInput";

export function RegisterForm() {
  const [name, setName] = useState("")
  const [telephone, setTelephone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Register attempt with:", { name, telephone,email, password })
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-row space-x-[16px]">
            <LoginInput id="name" label="Name" placeholder="Full Name" onChange={setName}/>
            <LoginInput id="telephone" label="Telephone" placeholder="012-345-6789" type="tel" onChange={setTelephone}/>
        </div>

        <LoginInput type="email" onChange={setEmail}/>

        <PasswordInput forgotPasswordLink="#" forgotPasswordText="" onChange={setPassword} />

        <button
          type="submit"
          className="h-12 w-full rounded-full bg-[#F49B4A] font-semibold text-[#0A0C10] transition-colors hover:bg-[#e48a3f]"
        >
          Create Account
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center">
        <div className="h-px flex-grow bg-gray-200"></div>
        <span className="mx-4 text-xl text-[#7D7E80]">Or Register with</span>
        <div className="h-px flex-grow bg-gray-200"></div>
      </div>

      {/* Social Login */}
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center rounded-full border border-gray-200 bg-[#f8f0e5] font-semibold text-black transition-colors hover:bg-[#f0e8dd]"
        onClick={() => console.log("Google login clicked")}
      >
        <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Register with Google
      </button>

      {/* Register Link */}
      <div className="text-center text=lg text-black relative">
      Already have an account?{" "}
        <Link href="#" className="font-semibold text-black underline hover:no-underline hover:text-lg">Login</Link>
      </div>
    </div>
  )
}
