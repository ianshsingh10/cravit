import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function DELETE(req) {
    await dbConnect();
    try {
        const cookie = await cookies();
        const token = cookie.get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const { cartItemId } = await req.json();
        const cartItem = await Cart.findById(cartItemId);

        if (!cartItem) return NextResponse.json({ error: "Item not found" }, { status: 404 });
        if (cartItem.userId.toString() !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

        await Cart.findByIdAndDelete(cartItemId);
        return NextResponse.json({ message: "Item removed successfully" });
    } catch (err) {
        // ... error handling
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}