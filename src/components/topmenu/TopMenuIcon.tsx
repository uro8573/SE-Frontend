"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopMenuIcon({
    pageRef,
    isTransparent,
    isSignup,
}: {
    imgPath: string;
    pageRef: string;
    isTransparent: boolean;
    isSignup: boolean;
}) {
    const pathname = usePathname();
    const isActive = pathname.toLowerCase() === pageRef.toLowerCase();

    const baseClasses =
        "relative text-ui-label-regular w-[40px] h-[40px] rounded-full flex justify-center items-center duration-700 ease-in-out";

    let stateClasses = "";

    if (isActive) {
        // Force black bg and white icon for active path
        stateClasses = "bg-primary-dark text-ct-white";
    } else if (isTransparent) {
        if (isSignup) {
            stateClasses = "bg-ct-white text-primary-dark";
        } else {
            stateClasses =
                "text-ct-white border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.1)]";
        }
    } else {
        if (isSignup) {
            stateClasses = "bg-primary-dark text-ct-white";
        } else {
            stateClasses =
                "text-primary-dark border border-transparent-stroke bg-transparent-bg";
        }
    }

    return (
        <Link href={pageRef} className={`${baseClasses} ${stateClasses}`}>
            <div className="relative w-6 h-6">
                <img
                    src="/res/svg/Bell-White.svg"
                    alt="icon white"
                    className={`absolute inset-0 object-contain transition-opacity duration-700 ease-in-out ${
                        isTransparent || isActive ? "opacity-100" : "opacity-0"
                    }`}
                />
                <img
                    src="/res/svg/Bell-Black.svg"
                    alt="icon black"
                    className={`absolute inset-0 object-contain transition-opacity duration-700 ease-in-out ${
                        isTransparent || isActive ? "opacity-0" : "opacity-100"
                    }`}
                />
            </div>
        </Link>
    );
}
