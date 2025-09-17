import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import OTP from "@/models/otp";
import { sendEmailOtp } from "@/lib/sendEmailOTP";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();
  if (!email) return Response.json({ error: "Email is required" }, { status: 400 });

  await dbConnect();
  const user = await User.findOne({ email });
  if (!user) return Response.json({ error: "Invalid credentials" }, { status: 401 });

  if (!user.password || user.password === "") {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.findOneAndUpdate({ email }, { code: otp, createdAt: new Date() }, { upsert: true });
    await sendEmailOtp(email, otp);
    return Response.json({ message: "OTP sent", isGoogleUser: true });
  }

  if (!password) {
    return Response.json({ error: "Password is required for this account" }, { status: 400 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await OTP.findOneAndUpdate({ email }, { code: otp, createdAt: new Date() }, { upsert: true });

  await sendEmailOtp(email, otp);

  return Response.json({ message: "OTP sent", isGoogleUser: false });
}
