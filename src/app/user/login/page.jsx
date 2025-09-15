"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { Mail, KeyRound, Loader2, AlertTriangle, CheckCircle, Lock } from 'lucide-react';
import { signIn, getProviders } from 'next-auth/react';

// New Inline SVG component for the Google Icon
const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.417 44 30.836 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);


export default function LoginPage() {
  const [step, setStep] = useState("enter");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [providers, setProviders] = useState(null);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
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
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/send-login-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        if (data.isGoogleUser) {
          setMsg(`OTP sent to ${email}`);
          setIsGoogleUser(true);
        } else {
          setMsg(`OTP sent to ${email}`);
          setIsGoogleUser(false);
        }
        setStep("verify");
      } else {
        setError(data.error || "Failed to send OTP. Please check your credentials and try again.");
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
      const res = await fetch("/api/user/verify-login-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (res.ok) {
        setMsg("Login successful! Redirecting...");
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center p-4 pt-25">
      <div className="max-w-md w-full mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Welcome Back!</h2>
          <p className="text-gray-500 dark:text-gray-400">Login to continue your foodie journey.</p>
        </div>

        {error && <p className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-lg mb-4 text-sm flex items-center gap-2"><AlertTriangle size={18}/> {error}</p>}
        {msg && <p className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-3 rounded-lg mb-4 text-sm flex items-center gap-2"><CheckCircle size={18}/> {msg}</p>}

        {step === "enter" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="text-black dark:text-white bg-white dark:bg-gray-700 pl-10 border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent transition" 
                required 
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="password" 
                placeholder="Password (optional for Google accounts)" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="text-black dark:text-white bg-white dark:bg-gray-700 pl-10 border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent transition" 
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              If you registered with Google, you can leave password empty
            </p>
            <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 bg-orange-500 text-white font-bold px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300 disabled:bg-orange-400">
              {isLoading ? <><Loader2 className="animate-spin" size={20}/> Sending...</> : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
              Enter the 6-digit code sent to your email.
            </p>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength="6" className="text-black dark:text-white bg-white dark:bg-gray-700 pl-10 border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full text-center tracking-[0.5em] focus:ring-2 focus:ring-orange-500 focus:border-transparent transition" required/>
            </div>
            <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 bg-green-500 text-white font-bold px-4 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 disabled:bg-green-400">
              {isLoading ? <><Loader2 className="animate-spin" size={20}/> Verifying...</> : "Verify & Login"}
            </button>
            <div className="text-center text-sm">
              <button type="button" onClick={() => setStep('enter')} className="text-orange-500 hover:underline">
                Use different credentials? Go back.
              </button>
            </div>
          </form>
        )}

        <div className="my-6 flex items-center">
          <hr className="flex-grow border-gray-200 dark:border-gray-700" />
          <span className="mx-4 text-gray-400 dark:text-gray-500 text-xs font-semibold">OR</span>
          <hr className="flex-grow border-gray-200 dark:border-gray-700" />
        </div>

        {providers?.google && (
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <GoogleIcon />
            Continue with Google
          </button>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <a href="/user/register" className="font-semibold text-orange-500 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
