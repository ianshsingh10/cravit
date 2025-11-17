"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, User, Phone, KeyRound, Loader2, AlertTriangle, CheckCircle, Lock, ArrowRight } from 'lucide-react';
import { signIn, getProviders } from 'next-auth/react';
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Google Icon Component
const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.417 44 30.836 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);

export default function RegisterPage() {
    const [step, setStep] = useState("form"); // "form" or "otp"
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [providers, setProviders] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        };
        fetchProviders();
    }, []);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError("");
        setMsg("");
        if (!name || !email || !phoneNo || !password) {
            setError("All fields are required.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch("/api/user/send-register-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, phoneNo, name, password }),
            });
            const data = await res.json();
            if (res.ok) {
                setMsg(`OTP sent to ${email}`);
                setStep("otp");
            } else {
                setError(data.error || "Failed to send OTP. Please try again.");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please check your connection.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        setMsg("");
        if (!otp) {
            setError("Please enter the OTP.");
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch("/api/user/verify-register-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, name, phoneNo, password }),
            });
            const data = await res.json();
            if (res.ok) {
                setMsg("Registration successful! Redirecting...");
                window.location.href = "/";
            } else {
                setError(data.error || "Invalid OTP. Please try again.");
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4 sm:px-6 lg:px-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Create Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Join the <span className="text-orange-500 font-bold">craVIT</span> community today!
                    </p>
                </div>

                {/* Feedback Messages */}
                <AnimatePresence>
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                            className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-3 rounded-r-md mb-6 text-sm flex items-center gap-3"
                        >
                            <AlertTriangle size={18} /> {error}
                        </motion.div>
                    )}
                    {msg && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                            className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 text-green-700 dark:text-green-300 p-3 rounded-r-md mb-6 text-sm flex items-center gap-3"
                        >
                            <CheckCircle size={18} /> {msg}
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {step === "form" ? (
                        <motion.form 
                            key="form-step"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            onSubmit={handleSendOtp} 
                            className="space-y-4"
                        >
                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input 
                                    type="text" 
                                    placeholder="Full Name" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder:text-gray-400" 
                                    required 
                                />
                            </div>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input 
                                    type="email" 
                                    placeholder="Email Address" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder:text-gray-400" 
                                    required 
                                />
                            </div>
                            <div className="relative">
                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input 
                                    type="tel" 
                                    placeholder="Phone Number" 
                                    value={phoneNo} 
                                    onChange={(e) => setPhoneNo(e.target.value)} 
                                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder:text-gray-400" 
                                    required 
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input 
                                    type="password" 
                                    placeholder="Password (min 6 chars)" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder:text-gray-400" 
                                    required 
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading} 
                                className="w-full mt-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={20}/> : <>Continue <ArrowRight size={18}/></>}
                            </button>
                        </motion.form>
                    ) : (
                        <motion.form 
                            key="otp-step"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            onSubmit={handleVerifyOtp} 
                            className="space-y-6"
                        >
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mb-4">
                                    <KeyRound size={28} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Verify Email</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Enter the code sent to <span className="font-medium text-gray-800 dark:text-gray-200">{email}</span>
                                </p>
                            </div>

                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="• • • • • •" 
                                    value={otp} 
                                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))} 
                                    className="w-full text-center text-2xl tracking-[0.5em] font-bold py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-900 dark:text-white"
                                    autoFocus
                                    required 
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading} 
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/40 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={20}/> : "Verify & Create Account"}
                            </button>

                            <button 
                                type="button" 
                                onClick={() => setStep('form')} 
                                className="w-full text-sm text-gray-500 hover:text-orange-600 dark:hover:text-orange-400 font-medium transition-colors"
                            >
                                Incorrect details? Go back
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* Social & Login Links */}
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                    {providers?.google && (
                        <button
                            type="button"
                            onClick={() => signIn("google", { callbackUrl: "/" })}
                            className="w-full mb-6 flex items-center justify-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-sm"
                        >
                            <GoogleIcon />
                            <span>Sign up with Google</span>
                        </button>
                    )}

                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link href="/user/login" className="font-bold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors">
                            Login here
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}