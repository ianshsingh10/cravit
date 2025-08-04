import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";

export async function POST(req) {
  const { phoneNo } = await req.json();
  if (!phoneNo) return Response.json({ error: "Phone number is required" }, { status: 400 });

  await dbConnect();

  const user = await User.findOne({ phoneNo });
  if (!user) {
    return Response.json({ error: "User not found. Please register." }, { status: 404 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();

  console.log(`Login OTP for ${phoneNo} is ${otp}`);

  return Response.json({ message: "OTP sent to phone" });
}
