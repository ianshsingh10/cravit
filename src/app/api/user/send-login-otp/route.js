import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import OTP from "@/models/otp";
import { sendEmailOtp } from "@/lib/sendEmailOTP";

export async function POST(req) {
  const { email } = await req.json();
  if (!email) return Response.json({ error: "Email is required" }, { status: 400 });

  await dbConnect();
  const user = await User.findOne({ email });
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await OTP.findOneAndUpdate({ email }, { code: otp, createdAt: new Date() }, { upsert: true });

  await sendEmailOtp(email, otp);

  return Response.json({ message: "OTP sent" });
}
