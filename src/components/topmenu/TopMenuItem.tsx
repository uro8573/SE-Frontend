"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TopMenuItem({ title, pageRef, isTransparent }: { title: string; pageRef: string; isTransparent:Boolean }) {
    const pathname = usePathname()
    const isActive = pathname.toLowerCase() === pageRef.toLowerCase()

    return (
        <Link
            href={pageRef}
            className={` text-ui-label-regular px-[18px] py-[11px] rounded-full flex justify-center items-center duration-700 ease-in-out ${
                isTransparent ?
                    isActive ?
                        'bg-ct-white text-primary-dark'
                    :
                        'text-ct-white'
                    
                :
                    isActive ?
                        'bg-primary-dark text-ct-white'
                    :
                        'text-primary-dark'
                
            }`}
        >
            {title}
        </Link>
    )
}
