import dbConnect from "@/lib/dbConnect";
import Item from "@/models/items";
import Order from "@/models/order";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

async function handleReviewUpsert(req) {
    await dbConnect();

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const userName = decoded.name;

        const { orderId, itemId, rating, comment } = await req.json();

        if (!orderId || !itemId || !rating) {
            return NextResponse.json({ error: "Order ID, Item ID, and rating are required." }, { status: 400 });
        }

        const item = await Item.findById(itemId);
        if (!item) return NextResponse.json({ error: "Item not found." }, { status: 404 });

        const reviewIndex = item.reviews.findIndex(
            (r) => r.userId.toString() === userId.toString()
        );

        let message = "Review added successfully!";

        if (reviewIndex > -1) {
            item.reviews[reviewIndex].rating = Number(rating);
            item.reviews[reviewIndex].comment = comment || "";
            item.reviews[reviewIndex].userName = userName;
            message = "Review updated successfully!";
        } else {
            const review = {
                userId,
                userName,
                rating: Number(rating),
                comment: comment || "",
            };
            item.reviews.push(review);
        }

        item.numReviews = item.reviews.length;
        item.rating = item.reviews.reduce((acc, r) => r.rating + acc, 0) / item.reviews.length;
        
        await item.save();

        const orderUpdate = await Order.updateOne(
            { _id: orderId, "items.itemId": itemId },
            { $set: { "items.$.foodRating": rating, "items.$.review": comment || "" } }
        );

        if (orderUpdate.modifiedCount === 0) {
            console.warn(`No order item was updated. orderId: ${orderId}, itemId: ${itemId}`);
I       }

        return NextResponse.json({ message: message });

    } catch (err) {
        console.error("Review submission error:", err);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}

export async function POST(req) {
    return handleReviewUpsert(req);
}

export async function PUT(req) {
    return handleReviewUpsert(req);
}