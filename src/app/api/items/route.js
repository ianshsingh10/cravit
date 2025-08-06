import dbConnect from "@/lib/dbConnect";
import Item from "@/models/items";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const items = await Item.find().sort({ createdAt: -1 });
    return NextResponse.json({ items });
  } catch (error) {
    console.error("Failed to fetch items:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}
