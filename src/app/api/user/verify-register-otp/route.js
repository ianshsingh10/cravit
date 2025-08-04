import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  const { phoneNo, otp } = await req.json();

  await dbConnect();

  const user = await User.findOne({ phoneNo });
  if (!user) {
    console.log("❌ User not found for phoneNo:", phoneNo);
    return Response.json({ error: "User not found" }, { status: 401 });
  }

  if (Number(user.otp) !== Number(otp)) {
    console.log("❌ Invalid OTP:", otp, "Expected:", user.otp);
    return Response.json({ error: "Invalid OTP" }, { status: 401 });
  }

  if (new Date() > user.otpExpiry) {
    console.log("❌ OTP expired at:", user.otpExpiry);
    return Response.json({ error: "OTP expired" }, { status: 401 });
  }

  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    path: "/login",
    maxAge: 86400,
  });

  return Response.json({ message: "Registration successful" });
}
