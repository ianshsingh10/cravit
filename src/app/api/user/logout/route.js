// File path: /app/api/user/logout/route.js

import { cookies } from "next/headers";

export async function POST(req) {
  try {
    // To log out, we set the cookie's expiration date to the past
    cookies().set("token", "", { httpOnly: true, path: "/", maxAge: -1 });
    return Response.json({ message: "Logged out successfully" }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Logout failed" }, { status: 500 });
  }
}