"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [step, setStep] = useState("enter");
  const [phoneNo, setPhoneNo] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");

  const sendOtp = async () => {
    const res = await fetch("/api/user/send-register-otp", {
      method: "POST",
      body: JSON.stringify({ phoneNo, name }),
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
    const res = await fetch("/api/user/verify-register-otp", {
      method: "POST",
      body: JSON.stringify({ phoneNo, otp }),
    });
    const data = await res.json();
    if (res.ok) {
      setMsg("Registration successful!");
    } else {
      setMsg(data.error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      {msg && <p className="text-blue-600 mb-4">{msg}</p>}

      {step === "enter" ? (
        <>
          <input
            type="text"
            placeholder="Name"
            className="border p-2 mb-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Phone Number"
            className="border p-2 mb-2 w-full"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
          <button onClick={sendOtp} className="bg-blue-600 text-white px-4 py-2 rounded">
            Send OTP
          </button>
        </>
      ) : (
        <>
          <input
            type="number"
            placeholder="Enter OTP"
            className="border p-2 mb-2 w-full"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp} className="bg-green-600 text-white px-4 py-2 rounded">
            Verify & Register
          </button>
        </>
      )}
    </div>
  );
}
