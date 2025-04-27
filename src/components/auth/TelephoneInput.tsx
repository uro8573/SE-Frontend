"use client"

interface LoginInputProps {
  id?: string;
  label?: string;
  inputname?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  type?: string;
  input: string;
  onChange?: (value: string) => void;
}

export default function TelephoneInput({
  id = "telephone",
  label = "Telephone",
  inputname = "",
  placeholder = "123-456-7890",
  required = true,
  className = "",
  type = "tel",
  input,
  onChange,
}: LoginInputProps) {

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const numbersOnly = value.replace(/\D/g, '');

    // Format based on number of digits
    const match = numbersOnly.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

    if (!match) return numbersOnly;

    let formatted = "";
    if (match[1]) {
      formatted += match[1];
    }
    if (match[2]) {
      formatted += `-${match[2]}`;
    }
    if (match[3]) {
      formatted += `-${match[3]}`;
    }
    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    if (onChange) {
      onChange(formatted);
    }
  };

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
        inputMode="numeric"
        className={`h-14 w-full rounded-2xl bg-gray-100 px-4 focus:outline-none text-ct-dark-grey ${className}`}
        onChange={handleChange}
        maxLength={12} // 3+1+3+1+4 = 12 characters total
      />
    </div>
  );
}
