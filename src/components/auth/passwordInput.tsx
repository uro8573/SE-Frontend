"use client"

import { useState } from "react"
import Link from "next/link"

interface PasswordInputProps {
  id?: string
  inputname?: string
  label?: string
  placeholder?: string
  required?: boolean
  className?: string
  forgotPasswordLink?: string
  forgotPasswordText?: string
  password: string
  onChange?: (value: string) => void
}

export function PasswordInput({
  id = "password",
  inputname = "",
  label = "Password",
  placeholder = "Account password",
  required = true,
  className = "",
  password,
  forgotPasswordLink,
  forgotPasswordText = "Forgot your password?",
  onChange,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        {label && (
          <label htmlFor={id} className="block text-p3-paragraphy-small font-bold text-primary-dark">
            {label}
          </label>
        )}
        {forgotPasswordLink && (
          <Link href={forgotPasswordLink} className="text-p3-paragraphy-small text-ct-light-dark hover:underline">
            {forgotPasswordText}
          </Link>
        )}
      </div>
      <div className="relative">
        <input
          id={id}
          name={inputname}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={password}
          required={required}
          className={`h-14 w-full rounded-2xl bg-gray-100 px-4 focus:outline-none text-ct-dark-grey ${className}`}
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
