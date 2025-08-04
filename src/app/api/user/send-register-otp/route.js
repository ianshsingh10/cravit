import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";

export async function POST(req) {
  const { phoneNo, name } = await req.json();
  if (!phoneNo || !name) return Response.json({ error: "Missing phone or name" }, { status: 400 });

  await dbConnect();

  const existing = await User.findOne({ phoneNo });
  if (existing) return Response.json({ error: "User already exists" }, { status: 409 });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

  await User.create({ phoneNo, name, otp, otpExpiry });

  console.log(`Register OTP for ${phoneNo} is ${otp} expires in ${otpExpiry}`);

  return Response.json({ message: "OTP sent" });
}
