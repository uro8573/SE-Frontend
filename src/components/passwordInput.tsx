"use client"

import { useState } from "react"
import Link from "next/link"

interface PasswordInputProps {
  id?: string
  label?: string
  placeholder?: string
  required?: boolean
  className?: string
  forgotPasswordLink?: string
  forgotPasswordText?: string
  onChange?: (value: string) => void
}

export function PasswordInput({
  id = "password",
  label = "Password",
  placeholder = "Account password",
  required = true,
  className = "",
  forgotPasswordLink,
  forgotPasswordText = "Forgot your password?",
  onChange,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        {label && (
          <label htmlFor={id} className="block text-[#0A0C10] text-lg font-bold">
            {label}
          </label>
        )}
        {forgotPasswordLink && (
          <Link href={forgotPasswordLink} className="text-lg text-[#424345] hover:underline">
            {forgotPasswordText}
          </Link>
        )}
      </div>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          required={required}
          className={`h-12 w-full rounded-2xl border border-gray-300 bg-gray-100 px-4 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 rounded-2xl bg-[#D8D8D8] text-[#7D7E80] ${className}`}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
        >
          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
        </button>
      </div>
    </div>
  )
}
