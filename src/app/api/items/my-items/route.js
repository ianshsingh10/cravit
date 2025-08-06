// File path: /app/api/items/my-items/route.js

import dbConnect from "@/lib/dbConnect";
import Item from "@/models/items";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/user";

export async function GET(req) {
  await dbConnect();

  try {
    const cookie= await cookies();

    const token =  cookie.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    
    const user = await User.findById(userId);
    if (!user || user.role !== 'seller') {
        return NextResponse.json({ error: "Access Denied" }, { status: 403 });
    }

    // 3. Fetch only the items that belong to this sellerId
    const items = await Item.find({ sellerId: userId });

    return NextResponse.json({ items });
  } catch (err) {
    console.error("Fetch my-items error:", err);
    if (err.name === 'JsonWebTokenError') {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}