"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [step, setStep] = useState("enter");
  const [phoneNo, setPhoneNo] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();


  const sendOtp = async () => {
    const res = await fetch("/api/user/send-login-otp", {
      method: "POST",
      body: JSON.stringify({ phoneNo }),
    });
    const data = await res.json();
    if (res.ok) {
      setStep("verify");
      setMsg("OTP sent successfully");
    } else {
      setMsg(data.error);
    }
  };

  const verifyOtp = async () => {
    const res = await fetch("/api/user/verify-login-otp", {
      method: "POST",
      body: JSON.stringify({ phoneNo, otp }),
    });
    const data = await res.json();
    if (res.ok) {
      setMsg("Login successful!");
      router.push("/"); // ✅ redirect to homepage
    } else {
      setMsg(data.error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <h2 className="text-2xl font-semibold mb-4">Login via OTP</h2>
      <p className="text-blue-600 mb-2">{msg}</p>

      {step === "enter" ? (
        <>
          <input
            type="tel"
            placeholder="Enter phone number"
            className="border p-2 mb-2 w-full"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
          <button
            onClick={sendOtp}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Send OTP
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            className="border p-2 mb-2 w-full"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            onClick={verifyOtp}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
}
