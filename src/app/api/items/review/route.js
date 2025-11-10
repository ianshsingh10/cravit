import dbConnect from "@/lib/dbConnect";
import Item from "@/models/items";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
    await dbConnect();
    try {
        const cookie = await cookies();
        const token = cookie.get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const userName = decoded.name;

        const { itemId, rating, comment } = await req.json();

        if (!itemId || !rating) {
            return NextResponse.json({ error: "Item ID and rating are required." }, { status: 400 });
        }

        const item = await Item.findById(itemId);
        if (!item) return NextResponse.json({ error: "Item not found." }, { status: 404 });

        const alreadyReviewed = item.reviews.find(
            (r) => r.userId.toString() === userId.toString()
        );

        if (alreadyReviewed) {
            return NextResponse.json({ error: "You have already reviewed this item." }, { status: 400 });
        }

        const review = {
            userId,
            userName,
            rating: Number(rating),
            comment: comment || "",
        };

        item.reviews.push(review);
        item.numReviews = item.reviews.length;
        item.rating = item.reviews.reduce((acc, item) => item.rating + acc, 0) / item.reviews.length;

        await item.save();

        return NextResponse.json({ message: "Review added successfully!" });

    } catch (err) {
        console.error("Review submission error:", err);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}