// "use client";

// import Link from "next/link";
// import { signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export function SignoutForm() {
//     const router = useRouter();
//     const [isLoading, setIsLoading] = useState(false);

//     const handleSignOut = async () => {
//         setIsLoading(true);
//         await signOut({ redirect: false });
//         router.push("/");
//     };

//     return (
//         <div className="space-y-6 relative">
//             {/* <Snackbar
//                 open={openAlert}
//                 autoHideDuration={5000}
//                 onClose={handleCloseAlert}
//                 anchorOrigin={{ vertical: "top", horizontal: "center" }}
//                 TransitionComponent={SlideTransition}
//             >
//                 <Alert
//                     onClose={handleCloseAlert}
//                     severity={alertSeverity}
//                     variant="filled"
//                     iconMapping={{
//                         success: <CheckCircle className="w-5 h-5" />,
//                         error: <AlertCircle className="w-5 h-5" />,
//                     }}
//                     sx={{
//                         width: "100%",
//                         borderRadius: "8px",
//                         boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//                         fontWeight: 500,
//                         "& .MuiAlert-icon": {
//                             fontSize: "1.25rem",
//                         },
//                     }}
//                 >
//                     {alertMessage}
//                 </Alert>
//             </Snackbar> */}

//             <button
//                 onClick={handleSignOut}
//                 disabled={isLoading}
//                 className={`h-14 w-full rounded-full text-ui-label-semi-bold text-primary-dark transition-colors ${
//                     isLoading
//                         ? "bg-primary-orange cursor-not-allowed opacity-70"
//                         : "bg-primary-orange hover:brightness-95"
//                 }`}
//             >
//                 {isLoading ? (
//                     <div className="flex items-center justify-center space-x-2">
//                         <svg
//                             className="animate-spin h-5 w-5 text-[#0A0C10]"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                         >
//                             <circle
//                                 className="opacity-25"
//                                 cx="12"
//                                 cy="12"
//                                 r="10"
//                                 stroke="currentColor"
//                                 strokeWidth="4"
//                             ></circle>
//                             <path
//                                 className="opacity-75"
//                                 fill="currentColor"
//                                 d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                             ></path>
//                         </svg>
//                         <span>Signing Out...</span>
//                     </div>
//                 ) : (
//                     "Sign Out"
//                 )}
//             </button>

//             {/* Register Link */}
//             <div className="text-center text-p3-paragraphy-small text-primary-dark">
//                 Changed your mind?{" "}
//                 <Link
//                     href="/api/auth/signin"
//                     className="text-p3-paragraphy-small text-primary-dark font-bold no-underline hover:underline"
//                 >
//                     Go back to Home
//                 </Link>
//             </div>
//         </div>
//     );
// }

"use client";

import { signOut } from "next-auth/react";

export function SignoutForm() {
  const handleSignOut = async () => {
    // เรียก signOut แบบไม่ redirect ทันที
    await signOut({ redirect: false });

    // รีโหลดหน้าใหม่เพื่อเคลียร์ session ฝั่ง client
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-[20px] h-[72px] bg-white text-black font-semibold py-3 rounded-md hover:bg-gray-100 transition-all"
    >
      Sign Out
    </button>
  );
}


