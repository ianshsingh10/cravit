import dbConnect from "@/lib/dbConnect";
import OTP from "@/models/otp";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, otp, phoneNo, name, password } = await req.json();
  if (!email || !otp || !phoneNo || !name || !password) {
    return Response.json({ error: "Missing data" }, { status: 400 });
  }

  await dbConnect();

  const match = await OTP.findOne({ email });
  if (!match || match.code !== otp) {
    return Response.json({ error: "Invalid OTP" }, { status: 401 });
  }

  let user = await User.findOne({ email });
  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 12);
    user = await User.create({ name, email, phoneNo, password: hashedPassword });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  const cookieStore = await cookies();
  cookieStore.set("token", token, { httpOnly: true, path: "/", maxAge: 86400 });

  await OTP.deleteOne({ email });

  return Response.json({ message: "User registered successfully" });
}
