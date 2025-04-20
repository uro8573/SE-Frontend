"use client"

interface LoginInputProps {
  id?: string
  label?: string
  inputname?: string
  placeholder?: string
  required?: boolean
  className?: string
  type?: string
  input: string
  onChange?: (value: string) => void
}

export default function LoginInput({
  id = "email",
  label = "Email",
  inputname = "",
  placeholder = "name@example.com",
  required = true,
  className = "",
  type = "text",
  input,
  onChange,
}: LoginInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-[#0A0C10] text-lg font-bold">
          {label}
        </label>
      )}
      <input
        id={id}
        name={inputname}
        placeholder={placeholder}
        value={input}
        required={required}
        type={type}
        className={`h-12 w-full rounded-2xl border border-gray-300 bg-gray-100 px-4 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 rounded-2xl bg-[#D8D8D8] text-[#0A0C10] ${className}`}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </div>
  )
}
