"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { Mail, User, Phone, KeyRound } from 'lucide-react';

export default function RegisterPage() {
  const [step, setStep] = useState("form"); // "form" or "otp"
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");
    if (!name || !email || !phoneNo) {
      setError("All fields are required.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/send-register-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phoneNo, name }),
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
        body: JSON.stringify({ email, otp, name, phoneNo }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Registration successful! Redirecting...");
        router.push("/"); // Redirect to homepage on success
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
    <div className="min-h-152 bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Create Your Account</h2>
          <p className="text-gray-500">Join the craVIT community today!</p>
        </div>

        {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">{error}</p>}
        {msg && <p className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm">{msg}</p>}

        {step === "form" ? (
          <form onSubmit={handleSendOtp} className="space-y-4 ">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="text-black pl-10 border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-400 focus:border-transparent transition" required />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="text-black pl-10 border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-400 focus:border-transparent transition" required />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input type="tel" placeholder="Phone Number" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} className="text-black pl-10 border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-400 focus:border-transparent transition" required />
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
              <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength="6" className="pl-4 border border-gray-300 text-black p-3 rounded-lg w-full text-center tracking-[0.5em] focus:ring-2 focus:ring-orange-400 focus:border-transparent transition" required />
            </div>
            <button type="submit" disabled={isLoading} className="bg-green-500 text-white font-bold px-4 py-3 rounded-lg w-full hover:bg-green-600 transition-colors duration-300 disabled:bg-green-300">
              {isLoading ? "Verifying..." : "Verify & Register"}
            </button>
            <div className="text-center text-sm">
              <button type="button" onClick={() => setStep('form')} className="text-orange-500 hover:underline">
                Entered wrong details? Go back.
              </button>
            </div>
          </form>
        )}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/user/login" className="font-semibold text-orange-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
