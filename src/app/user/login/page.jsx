"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { Mail, KeyRound } from 'lucide-react';


export default function LoginPage() {
  const [step, setStep] = useState("enter"); // "enter" or "verify"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMsg(`OTP sent to ${email}`);
        setStep("verify");
      } else {
        setError(data.error || "Failed to send OTP. Please check the email and try again.");
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
            router.push("/");
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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
            <Image
              src="/cravit-logo.jpg" // Ensure your logo is in the `public` folder
              alt="craVIT Logo"
              width={100}
              height={100}
              className="mx-auto rounded-full"
            />
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Welcome Back!</h2>
          <p className="text-gray-500">Login to continue your foodie journey.</p>
        </div>

        {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">{error}</p>}
        {msg && <p className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm">{msg}</p>}

        {step === "enter" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="text-black pl-10 border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-400 focus:border-transparent transition" required />
            </div>
            <button type="submit" disabled={isLoading} className="bg-orange-500 text-white font-bold px-4 py-3 rounded-lg w-full hover:bg-orange-600 transition-colors duration-300 disabled:bg-orange-300">
              {isLoading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
             <p className="text-center text-gray-600 text-sm">
                Enter the 6-digit code sent to your email.
            </p>
            <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength="6" className="text-black pl-10 border border-gray-300 p-3 rounded-lg w-full text-center tracking-[0.5em] focus:ring-2 focus:ring-orange-400 focus:border-transparent transition" required/>
            </div>
            <button type="submit" disabled={isLoading} className="bg-green-500 text-white font-bold px-4 py-3 rounded-lg w-full hover:bg-green-600 transition-colors duration-300 disabled:bg-green-300">
              {isLoading ? "Verifying..." : "Verify & Login"}
            </button>
            <div className="text-center text-sm">
                <button type="button" onClick={() => setStep('enter')} className="text-orange-500 hover:underline">
                    Use a different email? Go back.
                </button>
            </div>
          </form>
        )}
         <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
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
