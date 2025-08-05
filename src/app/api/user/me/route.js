// File path: /app/api/user/me/route.js

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";

export async function GET(req) {
  await dbConnect();

  // 1. Get the token from the httpOnly cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // If no token, user is not logged in
  if (!token) {
    return Response.json({ user: null }, { status: 200 });
  }

  try {
    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find the user in the database
    const user = await User.findById(decoded.id).select("email name");

    if (!user) {
      return Response.json({ user: null }, { status: 404 });
    }

    // 4. Return the user's data
    return Response.json({ user: { email: user.email, name: user.name } }, { status: 200 });
  } catch (error) {
    // If token is invalid or expired
    return Response.json({ user: null }, { status: 401 });
  }
}