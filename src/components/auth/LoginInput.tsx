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
        <label htmlFor={id} className="block text-p3-paragraphy-small font-bold text-primary-dark">
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
        className={`h-14 w-full rounded-2xl bg-gray-100 px-4 focus:outline-none text-ct-dark-grey ${className}`}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </div>
  )
}
