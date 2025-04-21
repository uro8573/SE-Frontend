"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import LoginInput from "@/components/auth/LoginInput";
import { PasswordInput } from "@/components/auth/passwordInput";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import userRegister from "@/libs/userRegister";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import { AlertCircle, CheckCircle } from "lucide-react";

export function RegisterForm() {
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const router = useRouter();

    const [error, setError] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
        "success",
    );
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        console.log("Registering...");

        try {
            const res = await userRegister(email, password, name, telephone);

            if (res?.error) {
                showAlert("error", "Register failed! Input is incorrect.");
                setError("Input is incorrect.");
            } else {
                showAlert("success", "Register successful! Redirecting...");

                setTimeout(() => {
                    router.push("/");
                    router.refresh();
                }, 2000);
            }
        } catch (err) {
            showAlert("error", "Please check your Input");
            console.error("Register error:", err);
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
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                TransitionComponent={SlideTransition}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity={alertSeverity}
                    variant="filled"
                    iconMapping={{
                        success: <CheckCircle className="w-5 h-5" />,
                        error: <AlertCircle className="w-5 h-5" />,
                    }}
                    sx={{
                        width: "100%",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        fontWeight: 500,
                        "& .MuiAlert-icon": {
                            fontSize: "1.25rem",
                        },
                    }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-row space-x-[16px]">
                    <LoginInput
                        id="name"
                        input={name}
                        label="Name"
                        placeholder="Full Name"
                        onChange={setName}
                    />
                    <LoginInput
                        id="telephone"
                        input={telephone}
                        label="Telephone"
                        placeholder="012-345-6789"
                        type="tel"
                        onChange={setTelephone}
                    />
                </div>

                <LoginInput type="email" input={email} onChange={setEmail} />

                <PasswordInput
                    forgotPasswordLink="#"
                    forgotPasswordText=""
                    password={password}
                    onChange={setPassword}
                />

                <button
                    type="submit"
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
                            <span>Create Account...</span>
                        </div>
                    ) : (
                        "Create Account"
                    )}
                </button>
            </form>

            {/* Divider */}
            <div className="flex items-center">
                <div className="h-1 flex-grow bg-[#9E9E9E] rounded-full"></div>
                <span className="mx-4 text-p3-paragraphy-small text-ct-dark-grey">
                    Or Register with
                </span>
                <div className="h-1 flex-grow bg-[#9E9E9E] rounded-full"></div>
            </div>

            {/* Social Login */}
            <button
                type="button"
                className="flex h-14 w-full gap-3 items-center justify-center rounded-full bg-secondary-orange text-ui-label-semi-bold text-primary-dark transition-colors hover:brightness-95"
                onClick={() => console.log("Google login clicked")}
            >
                <img src="/res/svg/Social-Icons-google.svg" alt="icon" />
                Register with Google
            </button>

            {/* Register Link */}
            <div className="text-center text-p3-paragraphy-small text-primary-dark">
                Already have an account?{" "}
                <Link
                    href="/api/auth/signin"
                    className="text-p3-paragraphy-small text-primary-dark font-bold no-underline hover:underline"
                >
                    Login
                </Link>
            </div>
        </div>
    );
}
