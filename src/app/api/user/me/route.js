// Corrected /app/api/user/me/route.js

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";

export async function GET(req) {
  await dbConnect();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return Response.json({ user: null });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("_id email name role phoneNo");

    if (!user) {
      return Response.json({ user: null });
    }
    
    return Response.json({ user });
  } catch (error) {
    return Response.json({ user: null });
  }
}