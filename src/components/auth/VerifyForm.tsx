"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import VerifyInput from "./VerifyInput";
import { PasswordInput } from "@/components/auth/passwordInput";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import userRegister from "@/libs/userRegister";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import { AlertCircle, CheckCircle } from "lucide-react";

export function VerifyForm() {
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
                    <VerifyInput id="name" input={name} onChange={setName} />
                    <VerifyInput id="name" input={name} onChange={setName} />
                    <VerifyInput id="name" input={name} onChange={setName} />
                    <VerifyInput id="name" input={name} onChange={setName} />
                    <VerifyInput id="name" input={name} onChange={setName} />
                    <VerifyInput id="name" input={name} onChange={setName} />
                </div>
            </form>

            {/* Register Link */}
            <div className="text-center text-p3-paragraphy-small text-primary-dark">
                Didn't receive the verification code?{" "}
                <Link
                    href="/signin"
                    className="text-p3-paragraphy-small text-primary-dark font-bold no-underline hover:underline"
                >
                    Resend
                </Link>
            </div>
        </div>
    );
}
