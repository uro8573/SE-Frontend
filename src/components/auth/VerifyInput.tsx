"use client"

interface LoginInputProps {
  id?: string
  label?: string
  inputname?: string
  required?: boolean
  className?: string
  type?: string
  input: string
  onChange?: (value: string) => void
}

export default function VerifyInput({
  id = "email",
  label = "Email",
  inputname = "",
  required = true,
  className = "",
  type = "text",
  input,
  onChange,
}: LoginInputProps) {
  return (
    <input
      id={id}
      name={inputname}
      placeholder="-"
      value={input}
      required={required}
      type={type}
      className={`h-14 w-14 rounded-2xl bg-gray-100 px-4 focus:outline-none text-ct-dark-grey text-center ${className}`}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  )
}
