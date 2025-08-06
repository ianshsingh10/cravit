"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Phone, Mail, Loader2, AlertTriangle, CheckCircle } from 'lucide-react';

export default function EditProfilePage() {
    const [form, setForm] = useState({ name: '', phoneNo: '' });
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
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
                        setForm({ name: data.user.name || '', phoneNo: data.user.phoneNo || '' });
                    } else {
                        router.push('/user/login');
                    }
                } else {
                    router.push('/user/login');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const res = await fetch('/api/user/update-profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const result = await res.json();
            if (res.ok) {
                setSuccess(result.message || 'Profile updated successfully!');
            } else {
                setError(result.error || 'Failed to update profile.');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isAuthLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 flex flex-col justify-center items-center p-4 md:p-23">
            <div className="max-w-lg w-full mx-auto bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Edit Your Profile</h2>
                    <p className="text-gray-500">Keep your information up to date.</p>
                </div>

                {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm flex items-center gap-2"><AlertTriangle size={18}/> {error}</p>}
                {success && <p className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm flex items-center gap-2"><CheckCircle size={18}/> {success}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="email" value={user?.email || ''} className="pl-10 text-gray-500 bg-gray-100 border border-gray-300 p-3 rounded-lg w-full" disabled />
                    </div>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input name="name" value={form.name} placeholder="Your Full Name" className="pl-10 text-black border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-400" onChange={handleChange} required />
                    </div>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input name="phoneNo" type="tel" value={form.phoneNo} placeholder="Your Phone Number" className="pl-10 text-black border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-400" onChange={handleChange} required />
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 bg-orange-500 text-white font-bold px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-orange-300">
                        {isLoading ? <><Loader2 className="animate-spin" size={20}/> Saving...</> : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
}
