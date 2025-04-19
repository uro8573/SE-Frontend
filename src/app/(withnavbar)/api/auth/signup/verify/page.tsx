"use client";

import { useEffect, useState } from "react";
import { FaGoogle, FaInstagram, FaDiscord } from "react-icons/fa";

export default function VerifyPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const correctCode = "563757";

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const updatedCode = [...code];
    updatedCode[index] = value;
    setCode(updatedCode);
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };
  useEffect(() => {
    const joinedCode = code.join("");
    if (joinedCode.length === 6) {
      if (joinedCode === correctCode) {
        setMessage("✅ ยืนยันสำเร็จ");
        alert("ยืนยันสำเร็จ")
      } else {
        setMessage("❌ รหัสไม่ถูกต้อง");
        alert("❌ รหัสไม่ถูกต้อง")
      }
    } else {
      setMessage("");
    }
  }, [code]);


  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full mb-4" />
        <h1 className="text-xl font-semibold mb-2">Your Signup Verification Code</h1>

        <div className="flex justify-center space-x-3 my-4">
          {code.map((digit, i) => (
            <input
              key={i}
              id={`code-${i}`}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              className="w-10 h-12 text-xl text-center border rounded-md border-gray-300 text-black bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          ))}
        </div>

        <p className="text-sm text-gray-500 mb-4">Don’t share this code to anyone!</p>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-left p-3 rounded mb-4">
          <p className="text-sm font-semibold text-yellow-800 mb-1">⚠️ Didn't request this code yourself?</p>
          <p className="text-sm text-yellow-700">
            This code was generated from a device or browser on <strong>25/03/2024</strong>. If you did not initiate this request, you can safely <span className="underline">ignore this email</span>.
          </p>
        </div>

        <p className="text-xs text-gray-400 mb-4">This is an automated message. <strong>Please do not reply.</strong></p>

        <div className="flex justify-center gap-4 text-gray-600 text-xl">
          <FaGoogle />
          <FaInstagram />
          <FaDiscord />
        </div>
      </div>
    </main>
  );
}