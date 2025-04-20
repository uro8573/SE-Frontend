import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/(withnavbar)/api/auth/[...nextauth]/authOptions';
import getUserProfile from '@/libs/getUserProfile';
import { Link } from '@mui/material';
import { useEffect } from 'react';

export default async function TopMenu() {

    const session = await getServerSession(authOptions);

    return (
        <div className="bg-black/10 w-full px-8 text-black flex flex-col items-center fixed z-50 pt-[26px] pb-[10px]">
            <div className="bg-black/10 w-full max-w-screen-2xl flex flex-row justify-between">
                {/* <div>
                    <span className="text-[#F3E158] text-[28px] font-bold">TungTee</span>
                    <span className="text-[#D3C44E] text-[28px] font-bold">888</span>
                </div>
                <div className="flex">
                    <TopMenuItem title="Home" pageRef='/'/>
                    <TopMenuItem title="Search" pageRef='/search'/>
                </div>
                <div className='flex flex-row gap-2'>
                    <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
                        <div className="text-[14px] bg-black text-white px-[24px] py-[14px] rounded-lg hover:shadow-xl hover:bg-white hover:text-black duration-300">
                                {session ? `Sign Out` : `Sign In`}
                        </div>
                    </Link>
                    {
                        !session ? (
                            <Link href={"/api/auth/signup"}>
                                <div className="text-[14px] bg-white text-black border border-black px-[24px] py-[14px] rounded-lg hover:shadow-xl hover:bg-black hover:text-white duration-300">
                                    Sign Up
                                </div>
                            </Link>
                        ) : ""
                    }
                </div> */}
                <div className="bg-black/10 w-full flex flex-row gap-[1.5rem] justify-start items-center">
                <Image
                    src="/res/img/logo/Pure-White.png"
                    alt="Website logo"
                    width={40}
                    height={40}
                    className="object-contain"
                />
                </div>
                <div className="bg-black/20 w-full flex flex-row gap-[1.5rem] justify-center items-center">
                    <TopMenuItem title="Home" pageRef='/'/>
                    <TopMenuItem title="Search" pageRef='/search'/>
                    <TopMenuItem title="Manage" pageRef='/manage/current-reservations'/>
                    
                </div>
                {
                    session?.user.role ? (
                        <div className="bg-black/10 w-full flex flex-row gap-[1.5rem] justify-end items-center">
                            <TopMenuItem title='Sign Out' pageRef='/api/auth/signout'/>
                        </div>
                    ) : (
                        <div className="bg-black/10 w-full flex flex-row gap-[1.5rem] justify-end items-center">
                            <TopMenuItem title="Sign In" pageRef='/api/auth/signin'/>
                            <TopMenuItem title="Register" pageRef='/api/auth/signup'/>
                        </div>
                    )
                }   
            </div>
        </div>
    )
}
