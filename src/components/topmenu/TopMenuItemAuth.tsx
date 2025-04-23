"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopMenuItemAuth({
    title,
    pageRef,
    isTransparent,
    isSignin
}: {
    title: string;
    pageRef: string;
    isTransparent: boolean;
    isSignin: boolean;
}) {
    const pathname = usePathname();
    const isActive = pathname.toLowerCase() === pageRef.toLowerCase();

    const baseClasses =
        'text-ui-label-regular px-[18px] py-[11px] rounded-full flex justify-center items-center duration-700 ease-in-out';

    let stateClasses = '';

    if (isTransparent) {
        if (isSignin) {
            // Signin button on transparent bg → white bg + dark text
            stateClasses = 'bg-ct-white text-primary-dark';
        } else if (isActive) {
            stateClasses = 'bg-ct-white text-primary-dark';
        } else {
            stateClasses = 'text-ct-white border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.1)]';
        }
    } else {
        if (isSignin) {
            // Signin button on solid bg → black bg + white text
            stateClasses = 'bg-primary-dark text-ct-white';
        } else if (isActive) {
            stateClasses = 'bg-primary-dark text-ct-white';
        } else {
            stateClasses = 'text-primary-dark border border-transparent-stroke bg-transparent-bg';
        }
    }

    return (
        <Link
            href={pageRef}
            className={`${baseClasses} ${stateClasses}`}
        >
            {title}
        </Link>
    );
}
