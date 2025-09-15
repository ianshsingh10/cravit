import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function PUT(req) {
    await dbConnect();
    try {
        const cookie = await cookies();
        const token = cookie.get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const { cartItemId, quantity, service } = await req.json();

        // Find the cart item and verify ownership
        const cartItem = await Cart.findById(cartItemId);
        if (!cartItem) return NextResponse.json({ error: "Item not found" }, { status: 404 });
        if (cartItem.userId.toString() !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

        // Conditionally update the fields that were passed
        if (quantity !== undefined) {
            if (quantity < 1) return NextResponse.json({ error: "Quantity must be at least 1" }, { status: 400 });
            cartItem.quantity = quantity;
        }

        if (service !== undefined) {
            if (!['dine-in', 'parcel'].includes(service)) return NextResponse.json({ error: "Invalid service type" }, { status: 400 });
            cartItem.service = service;
        }
        
        await cartItem.save();
        await cartItem.populate('itemId');
        
        return NextResponse.json(cartItem);

    } catch (err) {
        console.error("Cart update error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}