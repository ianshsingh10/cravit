// File path: /app/api/items/delete/route.js

import dbConnect from "@/lib/dbConnect";
import Item from "@/models/items";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function DELETE(req) {
  await dbConnect();

  try {
    // Verify user is a seller
    const token = cookies().get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    jwt.verify(token, process.env.JWT_SECRET);

    const { itemId } = await req.json();

    if (!itemId) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    const result = await Item.findByIdAndDelete(itemId);

    if (!result) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json({ error: "Item deletion failed" }, { status: 500 });
  }
}