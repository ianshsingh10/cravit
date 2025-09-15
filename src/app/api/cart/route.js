import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req) {
    await dbConnect();
    try {
        const cookie = await cookies();
        const token = cookie.get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // ✅ FIX: Chain .populate('itemId') to the query
        // This will fetch the full Item document and place it inside the 'itemId' field
        const cartItems = await Cart.find({ userId: userId }).populate('itemId');

        return NextResponse.json(cartItems);

    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}