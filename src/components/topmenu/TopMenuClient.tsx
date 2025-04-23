// TopMenuClient.tsx (client component)
"use client";

import { useEffect, useState } from 'react';
import TopMenuItem from './TopMenuItem';
import TopMenuAuth from './TopMenuAuth';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TopMenuItemAuth from './TopMenuItemAuth';

export default function TopMenuClient({ session }: { session: any }) {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);

    const isHome = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > window.innerHeight * 0.93);
        };

        if (isHome) {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [isHome]);

    const isTransparent = isHome && !isScrolled;

    const menuClasses = `
        fixed z-50 w-full px-8 pt-[26px] pb-[10px]
        flex flex-col items-center
        transition-all duration-500 ease-in-out
        ${isTransparent ? 'bg-transparent' : 'bg-white'}
        ${isTransparent ? 'text-white' : 'text-black'}
    `;

    return (
        <div className={menuClasses}>
            <div className="w-full max-w-screen-2xl flex flex-row justify-between items-center">
                <div className="relative w-full h-10 flex items-center">
                    <Link href={"/"} className="relative w-[40px] h-[40px]">
                        <Image
                            src="/res/img/logo/White.png"
                            alt="Logo white"
                            fill
                            className={`object-contain transition-opacity duration-700 ease-in-out ${
                                isTransparent ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                        <Image
                            src="/res/img/logo/Pure-Black.png"
                            alt="Logo black"
                            fill
                            className={`object-contain transition-opacity duration-700 ease-in-out absolute top-0 left-0 ${
                                isTransparent ? 'opacity-0' : 'opacity-100'
                            }`}
                        />
                    </Link>
                </div>

                <div className="w-full flex flex-row gap-[1.5rem] justify-center items-center">
                    <TopMenuItem title="Home" pageRef="/" isTransparent={isTransparent}/>
                    <TopMenuItem title="Search" pageRef="/search" isTransparent={isTransparent}/>
                    <TopMenuItem title="Manage" pageRef="/manage/current-reservations" isTransparent={isTransparent}/>
                </div>
                <div className="relative w-full flex flex-row gap-[1.5rem] justify-end items-center">
                    {session?.user.role ? (
                        <>
                            <TopMenuItemAuth title="N" pageRef="/manage/history/notifications" isTransparent={isTransparent} isSignup={false}/>
                            <TopMenuItem title="Sign Out" pageRef="/signout" isTransparent={isTransparent}/>
                        </>
                    ) : (
                        <>
                            <TopMenuItemAuth title="Sign In" pageRef="/signin" isTransparent={isTransparent} isSignup={false}/>
                            <TopMenuItemAuth title="Register" pageRef="/signup" isTransparent={isTransparent} isSignup={true}/>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}