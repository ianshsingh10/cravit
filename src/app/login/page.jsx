"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [step, setStep] = useState("enter");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const sendOtp = async () => {
    const res = await fetch("/api/user/send-login-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) {
      setMsg("OTP sent to email");
      setStep("verify");
    } else {
      setMsg(data.error);
    }
  };

  const verifyOtp = async () => {
    const res = await fetch("/api/user/verify-login-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/");
    } else {
      setMsg(data.error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {msg && <p className="text-blue-600 mb-4">{msg}</p>}

      {step === "enter" ? (
        <>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 mb-4 w-full" />
          <button onClick={sendOtp} className="bg-blue-600 text-white px-4 py-2 rounded w-full">Send OTP</button>
        </>
      ) : (
        <>
          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="border p-2 mb-4 w-full" />
          <button onClick={verifyOtp} className="bg-green-600 text-white px-4 py-2 rounded w-full">Verify & Login</button>
        </>
      )}
    </div>
  );
}
