"use client"

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import EmailInput from "@/components/LoginInput";
import { PasswordInput } from "@/components/passwordInput";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Alert, Snackbar, Slide, SlideProps } from "@mui/material";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const showAlert = (severity: "success" | "error", message: string) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setOpenAlert(true);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            showAlert("error", "Login failed! Email or password is incorrect.");
            setError("Email or password is incorrect.");
        } else {
            showAlert("success", "Login successful! Redirecting...");
            
            setTimeout(() => {
                router.push("/");
                router.refresh();
            }, 1500);
        }
    } catch (err) {
        showAlert("error", "Please check your Email and Password");
        console.error("Login error:", err);
        setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
  }

  return (
    <div className="space-y-6 relative">
      <Snackbar
        open={openAlert}
        autoHideDuration={5000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertSeverity}
          variant="filled"
          iconMapping={{
            success: <CheckCircle className="w-5 h-5" />,
            error: <AlertCircle className="w-5 h-5" />
          }}
          sx={{
            width: '100%',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontWeight: 500,
            "& .MuiAlert-icon": {
              fontSize: "1.25rem"
            }
          }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      <form onSubmit={handleLogin} className="space-y-6">
        <EmailInput input={email} onChange={setEmail} />
        <PasswordInput forgotPasswordLink="#" onChange={setPassword} password={password}/>
        <button
          type="submit"
          disabled={isLoading}
          className={`h-12 w-full rounded-full font-semibold text-[#0A0C10] transition-colors ${
            isLoading
              ? "bg-[#e48a3f] cursor-not-allowed opacity-70"
              : "bg-[#F49B4A] hover:bg-[#e48a3f]"
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
              <span>Logging in...</span>
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center">
        <div className="h-px flex-grow bg-gray-200"></div>
        <span className="mx-4 text-xl text-[#7D7E80]">Or Login with</span>
        <div className="h-px flex-grow bg-gray-200"></div>
      </div>

      {/* Social Login */}
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center rounded-full border border-gray-200 bg-[#f8f0e5] font-semibold text-black transition-colors hover:bg-[#f0e8dd]"
        onClick={() => console.log("Google login clicked")}
      >
        <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Login with Google
      </button>

      {/* Register Link */}
      <div className="text-center text-lg text-black">
        Don&apos;t have an account?{" "}
        <Link href="#" className="font-semibold text-black underline hover:no-underline hover:text-[#F49B4A]">
          Register
        </Link>
      </div>
    </div>
  )
}

// "use client"

// import type React from "react";

// import { useState } from "react";
// import Link from "next/link";
// import EmailInput from "@/components/LoginInput";
// import { PasswordInput } from "@/components/passwordInput";
// import userLogIn from "@/libs/userLogIn";
// import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");

//     try {
//         const result = await signIn("credentials", {
//             email,
//             password,
//             redirect: false,
//         });

//         if (result?.error) {
//             alert("Login Fail")
//             setError("Email or password is incorrect.");
//         } else {
//             alert("Login success");
//             router.push("/");
//             router.refresh();
//         }
//     } catch (err) {
//         alert("Please check your Email and Password");
//         console.error("Login error:", err);
//         setError("Something went wrong. Please try again.");
//     }
// };

//   return (
//     <div className="space-y-6">
//       <form onSubmit={handleLogin} className="space-y-6">
//         <EmailInput input={email} onChange={setEmail} />

//         <PasswordInput forgotPasswordLink="#" onChange={setPassword} password={password}/>

//         <button
//           type="submit"
//           className="h-12 w-full rounded-full bg-[#F49B4A] font-semibold text-[#0A0C10] transition-colors hover:bg-[#e48a3f]"
//         >
//           Login
//         </button>
//       </form>

//       {/* Divider */}
//       <div className="flex items-center">
//         <div className="h-px flex-grow bg-gray-200"></div>
//         <span className="mx-4 text-xl text-[#7D7E80]">Or Login with</span>
//         <div className="h-px flex-grow bg-gray-200"></div>
//       </div>

//       {/* Social Login */}
//       <button
//         type="button"
//         className="flex h-12 w-full items-center justify-center rounded-full border border-gray-200 bg-[#f8f0e5] font-semibold text-black transition-colors hover:bg-[#f0e8dd]"
//         onClick={() => console.log("Google login clicked")}
//       >
//         <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg">
//           <path
//             d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//             fill="#4285F4"
//           />
//           <path
//             d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//             fill="#34A853"
//           />
//           <path
//             d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//             fill="#FBBC05"
//           />
//           <path
//             d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//             fill="#EA4335"
//           />
//         </svg>
//         Login with Google
//       </button>

//       {/* Register Link */}
//       <div className="text-center text=lg text-black relative">
//         Don&apos;t have an account?{" "}
//         <Link href="#" className="font-semibold text-black underline hover:no-underline hover:text-lg">
//           Register
//         </Link>
//       </div>
//     </div>
//   )
// }
