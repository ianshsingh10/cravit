import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  const { phoneNo, otp } = await req.json();

  if (!phoneNo || !otp) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  await dbConnect();

  const user = await User.findOne({ phoneNo });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  if (user.otp?.toString().trim() !== otp.toString().trim()) {
    return Response.json({ error: "Invalid OTP" }, { status: 401 });
  }

  if (new Date() > user.otpExpiry) {
    return Response.json({ error: "OTP expired" }, { status: 401 });
  }

  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 86400,
  });

  return Response.json({ message: "Login successful" });
}
