import Image from 'next/image';
import Link from 'next/link';
import TopMenuItem from "@/components/topmenu/TopMenuItem"

export default function TopMenuAuth() {
    return (
        <div className="fixed z-50 w-full px-8 pt-[26px] pb-[10px] flex flex-col items-center transition-all duration-500 ease-in-out">
            <div className="w-full max-w-screen-2xl flex flex-row justify-between items-center">
                <div className="relative w-full h-10 flex items-center">
                    <Link href={"/"} className="relative w-[40px] h-[40px]">
                        <Image
                            src="/res/img/logo/Pure-Black.png"
                            alt="Logo white"
                            fill
                            className="object-contain"
                        />
                    </Link>
                </div>

                <div className="w-full flex flex-row gap-[1.5rem] justify-center items-center"></div>
                <div className="w-full flex flex-row gap-[1.5rem] justify-end items-center"></div>
            </div>
        </div>
    )
}