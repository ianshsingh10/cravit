"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Phone, Mail, Loader2, AlertTriangle, CheckCircle, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function EditProfilePage() {
    const [form, setForm] = useState({ name: "", phoneNo: "" });
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // For profile save
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    
    // OTP States
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
                setSuccess(result.message || 'Profile updated successfully!');
                router.refresh();
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
        if (!form.phoneNo) {
            setError("Please enter a phone number.");
            return;
        }
        const formattedPhone = form.phoneNo.startsWith("+") 
        ? form.phoneNo 
        : `+91${form.phoneNo}`;
        setError(""); setSuccess("");
        setSendingOtp(true);
        try {
            const res = await fetch("/api/user/send-noverify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNo: formattedPhone }),
            });
            const result = await res.json();
            if (res.ok) {
                setOtpSent(true);
                setSuccess(result.message || "OTP sent successfully.");
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
        if (!otp) {
            setError("Please enter the OTP.");
            return;
        }
        const formattedPhone = form.phoneNo.startsWith("+") 
        ? form.phoneNo 
        : `+91${form.phoneNo}`;
        setError(""); setSuccess("");
        setVerifyingOtp(true);
        try {
            const res = await fetch("/api/user/verify-noupdate-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNo: formattedPhone, otp }),
            });
            const result = await res.json();
            if (res.ok) {
                setSuccess(result.message || "Phone verified.");
                setOtpSent(false);
                setOtp("");
                if (result.user) {
                    setUser(result.user);
                    setForm({ ...form, phoneNo: result.user.phoneNo || "" });
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
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex justify-center items-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                    <p className="text-sm text-gray-500 font-medium">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center p-4 pt-20 sm:pt-28">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-lg w-full mx-auto bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800"
            >
                <div className="text-center mb-8">
                    <div className="relative w-24 h-24 mx-auto mb-4 group">
                        <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-gray-100 dark:ring-gray-800 bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-3xl font-bold text-orange-600 dark:text-orange-400">
                            {user?.image ? (
                                <Image src={user.image} alt="Profile" width={96} height={96} className="object-cover w-full h-full" />
                            ) : (
                                user?.name?.charAt(0).toUpperCase() || 'U'
                            )}
                        </div>
                        <div className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-md border border-gray-200 dark:border-gray-700 text-gray-500 cursor-not-allowed" title="Change photo coming soon">
                             <Camera size={16} />
                        </div>
                    </div>
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Edit Profile</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your personal details below.</p>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-xl mb-6 text-sm flex items-start gap-3"
                        >
                            <AlertTriangle size={18} className="mt-0.5 flex-shrink-0"/> 
                            <span>{error}</span>
                        </motion.div>
                    )}
                    {success && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-4 rounded-xl mb-6 text-sm flex items-start gap-3"
                        >
                            <CheckCircle size={18} className="mt-0.5 flex-shrink-0"/> 
                            <span>{success}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ✅ Corrected: onSubmit handler fixed */}
                <form onSubmit={handleSaveProfile} className="space-y-5">
                     <div>
                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-500 transition-colors" size={18} />
                            <input 
                                type="email" 
                                value={user?.email || ''} 
                                className="pl-11 pr-4 py-3 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl w-full cursor-not-allowed font-medium" 
                                disabled 
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-1 ml-1">Email cannot be changed.</p>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                name="name" 
                                value={form.name} 
                                placeholder="Your Full Name" 
                                className="pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl w-full text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all" 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>

                    <div>
                         <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Phone Number</label>
                        <div className="relative flex gap-2">
                             <div className="relative flex-grow">
                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    name="phoneNo" 
                                    type="tel" 
                                    value={form.phoneNo} 
                                    placeholder="Your Phone Number" 
                                    className="pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl w-full text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all" 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            {/* Verify Button for Phone */}
                            {!otpSent && form.phoneNo !== user?.phoneNo && (
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    disabled={sendingOtp}
                                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {sendingOtp ? <Loader2 className="w-4 h-4 animate-spin"/> : "Verify"}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* OTP Input Field (Only visible after sending OTP) */}
                    <AnimatePresence>
                        {otpSent && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-3 overflow-hidden"
                            >
                                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Enter OTP</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={otp} 
                                        onChange={(e) => setOtp(e.target.value)} 
                                        placeholder="123456" 
                                        className="flex-grow px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-center tracking-widest font-bold text-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                                        maxLength={6}
                                    />
                                    <button 
                                        type="button" 
                                        onClick={handleVerifyOtp} 
                                        disabled={verifyingOtp} 
                                        className="px-6 py-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {verifyingOtp ? <Loader2 className="w-5 h-5 animate-spin"/> : "Submit"}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-400 text-center">An OTP has been sent to {form.phoneNo}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button 
                        type="submit" 
                        disabled={isLoading} 
                        className="w-full mt-6 flex justify-center items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 disabled:opacity-70 disabled:shadow-none disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20}/> : "Save Changes"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}