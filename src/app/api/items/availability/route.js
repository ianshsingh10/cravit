import dbConnect from "@/lib/dbConnect";
import Item from "@/models/items";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function PUT(req) {
  await dbConnect();

  try {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    jwt.verify(token, process.env.JWT_SECRET);

    const { itemId } = await req.json();

    if (!itemId) {
      return NextResponse.json(
        { error: "Item ID is required in the request body" },
        { status: 400 }
      );
    }

    const itemToUpdate = await Item.findById(itemId);

    if (!itemToUpdate) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    itemToUpdate.availability = !itemToUpdate.availability;

    await itemToUpdate.save();

    return NextResponse.json(itemToUpdate);
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return NextResponse.json(
        { error: "Unauthorized: Invalid token." },
        { status: 401 }
      );
    }
    console.error("Update Availability Error:", err);
    return NextResponse.json(
      { error: "Internal server error during item update." },
      { status: 500 }
    );
  }
}
