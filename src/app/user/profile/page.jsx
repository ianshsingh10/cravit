// profile/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, Mail, Loader2, AlertTriangle, CheckCircle } from "lucide-react";

export default function EditProfilePage() {
    const [form, setForm] = useState({ name: "", phoneNo: "" });
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            setIsAuthLoading(true);
            try {
                const res = await fetch("/api/user/me");
                if (res.ok) {
                    const data = await res.json();
                    if (data.user) {
                        setUser(data.user);
                        setForm({ name: data.user.name || "", phoneNo: data.user.phoneNo || "" });
                    } else {
                        router.push("/user/login");
                    }
                } else {
                    router.push("/user/login");
                }
            } catch (err) {
                setError("An error occurred while fetching your data.");
            } finally {
                setIsAuthLoading(false);
            }
        };
        fetchUser();
    }, [router]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Save name only
    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(""); setSuccess("");
        try {
            const res = await fetch("/api/user/update-profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: form.name }),
            });
            const result = await res.json();
            if (res.ok) {
                setSuccess(result.message || "Profile updated successfully!");
                if (result.user) setUser(result.user);
            } else {
                setError(result.error || "Failed to update profile.");
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendOtp = async () => {
        setError(""); setSuccess("");
        setSendingOtp(true);
        try {
            const res = await fetch("/api/user/send-noverify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNo: form.phoneNo }),
            });
            const result = await res.json();
            if (res.ok) {
                setOtpSent(true);
                setSuccess(result.message || "OTP sent");
            } else {
                setError(result.error || "Failed to send OTP");
            }
        } catch (err) {
            setError("Failed to send OTP");
        } finally {
            setSendingOtp(false);
        }
    };

    const handleVerifyOtp = async () => {
        setError(""); setSuccess("");
        setVerifyingOtp(true);
        try {
            const res = await fetch("/api/user/verify-noupdate-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNo: form.phoneNo, otp }),
            });
            const result = await res.json();
            if (res.ok) {
                setSuccess(result.message || "Phone verified.");
                setOtpSent(false);
                setOtp("");
                // If the API returns the updated user, use it to refresh UI
                if (result.user) {
                    setUser(result.user);
                    setForm({ ...form, phoneNo: result.user.phoneNo || "" });
                } else {
                    // fallback: refetch user
                    const me = await (await fetch("/api/user/me")).json();
                    if (me.user) setUser(me.user);
                }
            } else {
                setError(result.error || "Invalid OTP");
            }
        } catch (err) {
            setError("Failed to verify OTP");
        } finally {
            setVerifyingOtp(false);
        }
    };

    if (isAuthLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
                <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center p-4 pt-30">
            <div className="max-w-lg w-full mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Edit Your Profile</h2>
                    <p className="text-gray-500 dark:text-gray-400">Keep your information up to date.</p>
                </div>

                {error && <p className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-lg mb-4 text-sm flex items-center gap-2"><AlertTriangle size={18} /> {error}</p>}
                {success && <p className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-3 rounded-lg mb-4 text-sm flex items-center gap-2"><CheckCircle size={18} /> {success}</p>}

                <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="email" value={user?.email || ""} className="pl-10 text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full" disabled />
                    </div>

                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input name="name" value={form.name} placeholder="Your Full Name" className="pl-10 text-black dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-500" onChange={handleChange} required />
                    </div>

                    <div className="relative">
                        <Phone className="absolute left-3 top-7 -translate-y-1/2 text-gray-400" size={20} />
                        <input name="phoneNo" type="tel" value={form.phoneNo} placeholder="Your Phone Number (E.164, eg +919876543210)" className="pl-10 text-black dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-500" onChange={handleChange} required />
                        {user?.phoneVerified ? (
                            <div className="mt-2 text-sm text-green-600 dark:text-green-300 flex items-center gap-2">
                                <CheckCircle size={16} /> Verified
                            </div>
                        ) : (
                            !otpSent ? (
                                <button type="button" onClick={handleSendOtp} disabled={sendingOtp} className="mt-2 bg-orange-500 text-white px-4 py-2 rounded w-full">
                                    {sendingOtp ? "Sending..." : "Send OTP"}
                                </button>
                            ) : (
                                <div className="mt-2 flex gap-2">
                                    <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" className="border p-2 rounded flex-1" />
                                    <button type="button" onClick={handleVerifyOtp} disabled={verifyingOtp} className="bg-green-500 text-white px-4 py-2 rounded">
                                        {verifyingOtp ? "Verifying..." : "Verify"}
                                    </button>
                                </div>
                            )
                        )}
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 bg-orange-500 text-white font-bold px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-orange-400">
                        {isLoading ? <><Loader2 className="animate-spin" size={20} /> Saving...</> : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
}