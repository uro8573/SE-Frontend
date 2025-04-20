'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TopMenuItem({ title, pageRef }: { title: string; pageRef: string }) {
    const pathname = usePathname()
    const isActive = pathname === pageRef

    return (
        <Link
            href={pageRef}
            className={`text-ui-label-regular text-primary-dark px-[18px] py-[11px] rounded-full flex justify-center items-center ${
                isActive ? 'bg-ct-white' : ''
            }`}
        >
            {title}
        </Link>
    )
}
