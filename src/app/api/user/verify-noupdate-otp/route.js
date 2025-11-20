// src/app/api/user/verify-noupdate-otp/route.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import twilio from "twilio";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_SID } = process.env;

if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_VERIFY_SERVICE_SID) {
    console.error("Missing Twilio environment variables in verify route");
}

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export async function POST(req) {
    await dbConnect();

    try {
        const cookie = await cookies();
        const token = cookie.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // ✅ Extract request body
        const { phoneNo, otp } = await req.json();
        if (!phoneNo || !otp) {
            return NextResponse.json(
                { error: "Phone number and OTP required" },
                { status: 400 }
            );
        }

        if (!phoneNo.startsWith("+")) {
            return NextResponse.json(
                { error: "Phone number must be in E.164 format (e.g. +919876543210)" },
                { status: 400 }
            );
        }

        // ✅ Verify OTP
        const check = await client.verify.v2
            .services(TWILIO_VERIFY_SERVICE_SID)
            .verificationChecks.create({ to: phoneNo, code: otp });


        if (check.status === "approved") {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { phoneNo, phoneVerified: true },
                { new: true }
            );

            if (!updatedUser) {
                return NextResponse.json({ error: "User not found." }, { status: 404 });
            }

            return NextResponse.json({
                message: "Phone verified & updated.",
                user: updatedUser,
            });
        } else {
            return NextResponse.json(
                { error: "Invalid or expired OTP." },
                { status: 400 }
            );
        }
    } catch (err) {
        console.error("verify-phone-otp error:", err);
        return NextResponse.json(
            { error: "Failed to verify OTP", details: err.message },
            { status: 500 }
        );
    }
}