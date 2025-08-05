import dbConnect from "@/lib/dbConnect";
import OTP from "@/models/otp";
import User from "@/models/user";
import { sendEmailOtp } from "@/lib/sendEmailOTP";

export async function POST(req) {
  const { name, phoneNo, email } = await req.json();
  if (!name || !phoneNo || !email) {
    return Response.json({ error: "All fields required" }, { status: 400 });
  }

  await dbConnect();

  const existing = await User.findOne({ email });
  if (existing) return Response.json({ error: "Email already registered" }, { status: 409 });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await OTP.findOneAndUpdate({ email }, { code: otp, createdAt: new Date() }, { upsert: true });

  await sendEmailOtp(email, otp);

  return Response.json({ message: "OTP sent" });
}
