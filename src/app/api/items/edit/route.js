import dbConnect from "@/lib/dbConnect";
import Item from "@/models/items";
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function PUT(req) {
  await dbConnect();

  try {
    const token = cookies().get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    jwt.verify(token, process.env.JWT_SECRET);

    const formData = await req.formData();
    const itemId = formData.get("itemId");
    const itemName = formData.get("itemName");
    const price = formData.get("price");
    const file = formData.get("image");
    const category = formData.get("category");

    if (!itemId) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    const itemToUpdate = await Item.findById(itemId);

    if (!itemToUpdate) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    itemToUpdate.itemName = itemName;
    itemToUpdate.price = price;
    itemToUpdate.category = category;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;
      const uploadRes = await cloudinary.uploader.upload(base64Image, {
        folder: "items",
      });
      itemToUpdate.image = uploadRes.secure_url;
    }

    await itemToUpdate.save();

    return NextResponse.json({ message: "Item updated successfully", item: itemToUpdate });
  } catch (err) {
    console.error("Edit error:", err);
    return NextResponse.json({ error: "Item update failed" }, { status: 500 });
  }
}