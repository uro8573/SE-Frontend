'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import userRegister from '@/libs/userRegister';
import { TextField } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(password != rePassword) {
        toast.error("Your Re-Password doesn't match.");
        return;
    }

    const res = await userRegister(email, password, name, tel);

    if(res.success) {
        toast.success("Register Successfully.");
        setTimeout(() => router.push("/api/auth/signin"), 2000);
    } else toast.error(res.message ? res.message : `An Error has occurred while registering.`)

  };

  return (
    <div>
      <div className="text-black text-2xl font-bold ml-[3%] mb-[2%]">Sign Up</div>
      <form onSubmit={handleSubmit} className='flex flex-col w-[50%] ml-[3%] gap-2'>
        <TextField label="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <TextField label="Your Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextField label="Your Telephone" type="tel" value={tel} onChange={(e) => setTel(e.target.value)} required />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <TextField label="Re-Password" type="password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} required />
        <button 
        className="mt-[3px] w-[200px] text-center text-[14px] bg-black text-white px-[24px] py-[14px] rounded-lg hover:shadow-xl hover:bg-white hover:text-black duration-300 hover:cursor-pointer"
        type='submit'>
            Sign Up
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
}