import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import twilio from "twilio";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_SID } = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export async function POST(req) {
  await dbConnect();

  try {
    const token = cookies().get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { phoneNo } = await req.json();
    if (!phoneNo) return NextResponse.json({ error: "Phone number required" }, { status: 400 });
    if (!phoneNo.startsWith("+")) return NextResponse.json({ error: "Phone number must be in E.164 format" }, { status: 400 });

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_VERIFY_SERVICE_SID) {
      return NextResponse.json({ error: "Twilio configuration missing" }, { status: 500 });
    }

    console.log("Sending OTP to:", phoneNo);

    const verification = await client.verify.v2.services(TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({ to: phoneNo, channel: "sms" });

    console.log("Twilio response:", verification);

    if (verification.status === "pending") {
      return NextResponse.json({
        message: "OTP sent successfully.",
        verificationSid: verification.sid
      });
    } else {
      return NextResponse.json({ error: "Failed to send OTP", details: verification }, { status: 500 });
    }

  } catch (err) {
    console.error("send-noverify-otp error:", err);
    return NextResponse.json({
      error: "Failed to send OTP",
      details: err.message,
      errorCode: err.code,
      errorStatus: err.status,
      moreInfo: err.moreInfo
    }, { status: 500 });
  }
}