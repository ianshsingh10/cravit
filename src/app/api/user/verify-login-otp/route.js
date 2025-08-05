import dbConnect from "@/lib/dbConnect";
import OTP from "@/models/otp";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  const { email, otp } = await req.json();
  if (!email || !otp) return Response.json({ error: "Missing data" }, { status: 400 });

  await dbConnect();
  const match = await OTP.findOne({ email });
  if (!match || match.code !== otp) return Response.json({ error: "Invalid OTP" }, { status: 401 });

  const user = await User.findOne({ email });
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  await cookies().set("token", token, { httpOnly: true, path: "/", maxAge: 86400 });

  await OTP.deleteOne({ email });

  return Response.json({ message: "Logged in successfully" });
}
