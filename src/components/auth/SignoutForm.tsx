"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";

export function SignoutForm() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' }); // Redirect after logout
    };

    return (
        <div className="space-y-6 relative">
            <button
                onClick={handleSignOut}
                disabled={isLoading}
                className={`h-14 w-full rounded-full text-ui-label-semi-bold text-primary-dark transition-colors ${
                    isLoading
                        ? "bg-primary-orange cursor-not-allowed opacity-70"
                        : "bg-primary-orange hover:brightness-95"
                }`}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                        <svg
                            className="animate-spin h-5 w-5 text-[#0A0C10]"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                        <span>Signing Out...</span>
                    </div>
                ) : (
                    "Sign Out"
                )}
            </button>

            {/* Register Link */}
            <div className="text-p3-paragraphy-small text-primary-dark">
                Changed your mind?{" "}
                <Link
                    href="/"
                    className="text-p3-paragraphy-small text-primary-dark font-bold no-underline hover:underline"
                >
                    Go back to Home
                </Link>
            </div>
        </div>
    );
}
