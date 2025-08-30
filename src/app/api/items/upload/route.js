import dbConnect from "@/lib/dbConnect";
import Item from "@/models/items";
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const file = formData.get("image");
    if(file){
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;
      const uploadRes = await cloudinary.uploader.upload(base64Image, {
        folder: "items",
      });
    }
    else{
      uploadRes.secure_url="https://res.cloudinary.com/dt8txihg4/image/upload/v1754516667/items/bp7jylyoiotgytnbppdg.png";
    }


    const newItem = new Item({
      sellerId: formData.get("sellerId"),
      sellerName: formData.get("sellerName"),
      itemName: formData.get("itemName"),
      price: formData.get("price"),
      image: uploadRes.secure_url,
    });

    await newItem.save();

    return NextResponse.json({ message: "Item added successfully", item: newItem });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Item upload failed" }, { status: 500 });
  }
}
