// File path: /app/api/user/update-profile/route.js

import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function PUT(req) {
  await dbConnect();

  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { name, phoneNo } = await req.json();

    if (!name || !phoneNo) {
        return NextResponse.json({ error: "Name and phone number are required." }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, phoneNo },
        { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedUser) {
        return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated successfully!" });
  } catch (err) {
    console.error("Profile update error:", err);
    return NextResponse.json({ error: "Failed to update profile." }, { status: 500 });
  }
}