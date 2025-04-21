// 'use client';

// import { useEffect, useState } from 'react';
// import TopMenuItem from './TopMenuItem';
// import Image from 'next/image';
// import { usePathname } from 'next/navigation';
// import { Session } from 'next-auth';

// type Props = {
//     session: Session | null;
// };

// export default function TopMenuClient({ session }: Props) {
//     const pathname = usePathname();
//     const [isScrolled, setIsScrolled] = useState(false);

//     const isHome = pathname === '/';

//     useEffect(() => {
//         const handleScroll = () => {
//             setIsScrolled(window.scrollY > window.innerHeight);
//         };

//         if (isHome) {
//             window.addEventListener('scroll', handleScroll);
//             return () => window.removeEventListener('scroll', handleScroll);
//         }
//     }, [isHome]);

//     const isTransparent = isHome && !isScrolled;

//     const menuClasses = `
//         fixed z-50 w-full px-8 pt-[26px] pb-[10px]
//         flex flex-col items-center
//         transition-all duration-500 ease-in-out
//         ${isTransparent ? 'bg-transparent' : 'bg-white/10 backdrop-blur-md shadow-md'}
//         ${isTransparent ? 'text-white' : 'text-black'}
//     `;

//     return (
//         <div className={menuClasses}>
//             <div className="w-full max-w-screen-2xl flex flex-row justify-between items-center">
//                 <div className="relative w-full h-10 flex items-center">
//                     <div className="relative w-[40px] h-[40px]">
//                         <Image
//                             src="/res/img/logo/White.png"
//                             alt="Logo white"
//                             fill
//                             className={`object-contain transition-opacity duration-700 ease-in-out ${
//                                 isTransparent ? 'opacity-100' : 'opacity-0'
//                             }`}
//                         />
//                         <Image
//                             src="/res/img/logo/Pure-Black.png"
//                             alt="Logo black"
//                             fill
//                             className={`object-contain transition-opacity duration-700 ease-in-out absolute top-0 left-0 ${
//                                 isTransparent ? 'opacity-0' : 'opacity-100'
//                             }`}
//                         />
//                     </div>
//                 </div>

//                 <div className="w-full flex flex-row gap-[1.5rem] justify-center items-center">
//                     <TopMenuItem title="Home" pageRef="/" />
//                     <TopMenuItem title="Search" pageRef="/search" />
//                     <TopMenuItem title="Manage" pageRef="/manage/current-reservations" />
//                 </div>
//                 <div className="w-full flex flex-row gap-[1.5rem] justify-end items-center">
//                     {session?.user.role ? (
//                         <TopMenuItem title="Sign Out" pageRef="/api/auth/signout" />
//                     ) : (
//                         <>
//                             <TopMenuItem title="Sign In" pageRef="/api/auth/signin" />
//                             <TopMenuItem title="Register" pageRef="/api/auth/signup" />
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import TopMenuItem from './TopMenuItem';
// import Image from 'next/image';
// import { usePathname } from 'next/navigation';
// import { useSession } from 'next-auth/react'; // ใช้ useSession แทน
// // ไม่ต้องรับ props แล้ว

// export default function TopMenuClient() {
//     const pathname = usePathname();
//     const [isScrolled, setIsScrolled] = useState(false);
//     const isHome = pathname === '/';

//     const { data: session } = useSession(); // ใช้ hook ดึง session

//     useEffect(() => {
//         const handleScroll = () => {
//             setIsScrolled(window.scrollY > window.innerHeight);
//         };

//         if (isHome) {
//             window.addEventListener('scroll', handleScroll);
//             return () => window.removeEventListener('scroll', handleScroll);
//         }
//     }, [isHome]);

//     const isTransparent = isHome && !isScrolled;

//     const menuClasses = `
//         fixed z-50 w-full px-8 pt-[26px] pb-[10px]
//         flex flex-col items-center
//         transition-all duration-500 ease-in-out
//         ${isTransparent ? 'bg-transparent' : 'bg-white/10 backdrop-blur-md shadow-md'}
//         ${isTransparent ? 'text-white' : 'text-black'}
//     `;

//     return (
//         <div className={menuClasses}>
//             <div className="w-full max-w-screen-2xl flex flex-row justify-between items-center">
//                 <div className="relative w-full h-10 flex items-center">
//                     <div className="relative w-[40px] h-[40px]">
//                         <Image
//                             src="/res/img/logo/White.png"
//                             alt="Logo white"
//                             fill
//                             className={`object-contain transition-opacity duration-700 ease-in-out ${
//                                 isTransparent ? 'opacity-100' : 'opacity-0'
//                             }`}
//                         />
//                         <Image
//                             src="/res/img/logo/Pure-Black.png"
//                             alt="Logo black"
//                             fill
//                             className={`object-contain transition-opacity duration-700 ease-in-out absolute top-0 left-0 ${
//                                 isTransparent ? 'opacity-0' : 'opacity-100'
//                             }`}
//                         />
//                     </div>
//                 </div>

//                 <div className="w-full flex flex-row gap-[1.5rem] justify-center items-center">
//                     <TopMenuItem title="Home" pageRef="/" />
//                     <TopMenuItem title="Search" pageRef="/search" />
//                     <TopMenuItem title="Manage" pageRef="/manage/current-reservations" />
//                 </div>
//                 <div className="w-full flex flex-row gap-[1.5rem] justify-end items-center">
//                     {session?.user?.role ? (
//                         <TopMenuItem title="Sign Out" pageRef="/api/auth/signout" />
//                     ) : (
//                         <>
//                             <TopMenuItem title="Sign In" pageRef="/api/auth/signin" />
//                             <TopMenuItem title="Register" pageRef="/api/auth/signup" />
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

'use client';

import { useEffect, useState } from 'react';
import TopMenuItem from './TopMenuItem';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function TopMenuClient() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const isHome = pathname === '/';

    const { data: session } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > window.innerHeight);
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
        ${isTransparent ? 'bg-transparent' : 'bg-white/10 backdrop-blur-md shadow-md'}
        ${isTransparent ? 'text-white' : 'text-black'}
    `;

    return (
        <div className={menuClasses}>
            <div className="w-full max-w-screen-2xl flex flex-row justify-between items-center">
                <div className="relative w-full h-10 flex items-center">
                    <div className="relative w-[40px] h-[40px]">
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
                    </div>
                </div>

                <div className="w-full flex flex-row gap-[1.5rem] justify-center items-center">
                    <TopMenuItem title="Home" pageRef="/" />
                    <TopMenuItem title="Search" pageRef="/search" />
                    <TopMenuItem title="Manage" pageRef="/manage/current-reservations" />
                </div>

                <div className="w-full flex flex-row gap-[1.5rem] justify-end items-center">
                    {session?.user?.role ? (
                        <button
                            onClick={() => signOut()}
                            className="hover:underline cursor-pointer"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => signIn()}
                                className="hover:underline cursor-pointer"
                            >
                                Sign In
                            </button>
                            <TopMenuItem title="Register" pageRef="/api/auth/signup" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}