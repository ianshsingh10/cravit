import dbConnect from "@/lib/dbConnect";
import OTP from "@/models/otp";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    await dbConnect();

    try {
        const { email, otp } = await req.json();
        if (!email || !otp) {
            return NextResponse.json({ error: "Email and OTP are required." }, { status: 400 });
        }

        const otpEntry = await OTP.findOne({ email });

        if (!otpEntry || otpEntry.code !== otp) {
            return NextResponse.json({ error: "Invalid or expired OTP." }, { status: 401 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role, 
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

        cookies().set("token", token, { 
            httpOnly: true, 
            path: "/", 
            maxAge: 86400, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict'
        });

        await OTP.deleteOne({ _id: otpEntry._id });

        return NextResponse.json({ message: "Logged in successfully.", user });

    } catch (err) {
        console.error("OTP Verification Error:", err);
        return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
    }
}