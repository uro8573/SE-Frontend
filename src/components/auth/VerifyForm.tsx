'use client';

import type React from "react";
import { useRef, useState } from "react";
import Link from "next/link";
import VerifyInput from "./VerifyInput";
import { useRouter } from "next/navigation";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import { AlertCircle, CheckCircle } from "lucide-react";
import verifyAccount from "@/libs/verifyAccount";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";

export function VerifyForm() {

    const { data: session} = useSession();

    const [codes, setCodes] = useState(["", "", "", "", "", ""]);
    const router = useRouter();

    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const [openAlert, setOpenAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");
    const [alertMessage, setAlertMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); // ป้องกันกดหลายรอบ

    const handleCloseAlert = () => setOpenAlert(false);

    const showAlert = (severity: "success" | "error", message: string) => {
        setAlertSeverity(severity);
        setAlertMessage(message);
        setOpenAlert(true);
    };

    const handleChange = (index: number, value: string) => {
        if (!/^[0-9]?$/.test(value)) return; // รับแค่ตัวเลข หรือว่าง
        const newCodes = [...codes];
        newCodes[index] = value;
        setCodes(newCodes);

        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        const joinedCode = newCodes.join('');
        if (joinedCode.length === 6 && newCodes.every((c) => c !== "")) {
            handleVerify(joinedCode);
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !codes[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async (fullCode: string) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const token = session?.user.token
            if (!token) {
                showAlert("error", "No token found, please login again.");
                return;
            }

            const res = await verifyAccount(token, fullCode);

            if (res?.success) {
                showAlert("success", "Account verified! Redirecting...");
                setTimeout(() => {
                    router.push("/"); // หรือไปหน้าที่ต้องการหลัง verify
                    router.refresh();
                }, 2000);
            } else {
                showAlert("error", res?.message || "Verification failed!");
            }
        } catch (err) {
            console.error("Verification error:", err);
            showAlert("error", "An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
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
                        "& .MuiAlert-icon": { fontSize: "1.25rem" },
                    }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>

            <form className="space-y-6">
                <div className="flex flex-row space-x-[16px]">
                    {codes.map((code, index) => (
                        <VerifyInput
                            key={index}
                            id={`verify-${index}`}
                            input={code}
                            onChange={(val: string) => handleChange(index, val)}
                            inputRef={(el: HTMLInputElement) => (inputRefs.current[index] = el)}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                        />
                    ))}
                </div>
            </form>

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
