"use client"

interface EmailInputProps {
  id?: string
  label?: string
  placeholder?: string
  required?: boolean
  className?: string
  onChange?: (value: string) => void
}

export function EmailInput({
  id = "email",
  label = "Email",
  placeholder = "name@example.com",
  required = true,
  className = "",
  onChange,
}: EmailInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-[#0A0C10] text-lg font-bold">
          {label}
        </label>
      )}
      <input
        id={id}
        type="email"
        placeholder={placeholder}
        required={required}
        className={`h-12 w-full rounded-md border border-gray-300 bg-gray-100 px-4 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 rounded-2xl bg-[#D8D8D8] text-[#7D7E80] ${className}`}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </div>
  )
}
