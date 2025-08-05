"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [step, setStep] = useState("form");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const sendOtp = async () => {
    const res = await fetch("/api/user/send-register-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phoneNo, name }),
    });
    const data = await res.json();
    if (res.ok) {
      setMsg("OTP sent to email");
      setStep("otp");
    } else {
      setMsg(data.error);
    }
  };

  const verifyOtp = async () => {
    const res = await fetch("/api/user/verify-register-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, name, phoneNo }),
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
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      {msg && <p className="text-blue-600 mb-4">{msg}</p>}

      {step === "form" ? (
        <>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 mb-2 w-full" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 mb-2 w-full" />
          <input type="tel" placeholder="Phone Number" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} className="border p-2 mb-4 w-full" />
          <button onClick={sendOtp} className="bg-blue-600 text-white px-4 py-2 rounded w-full">Send OTP</button>
        </>
      ) : (
        <>
          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="border p-2 mb-4 w-full" />
          <button onClick={verifyOtp} className="bg-green-600 text-white px-4 py-2 rounded w-full">Verify & Register</button>
        </>
      )}
    </div>
  );
}
