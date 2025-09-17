import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
    await dbConnect();
    try {
        const cookie = await cookies();
        const token = cookie.get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Ensure the user is a seller
        if (decoded.role !== 'seller') {
            return NextResponse.json({ error: "Forbidden: Access denied" }, { status: 403 });
        }
        const sellerId = decoded.id;

        const orders = await Order.find({ sellerId: sellerId })
            .sort({ createdAt: -1 })
            // Populate the customer's details from the User model
            .populate({
                path: 'userId',
                select: 'name email'
            });

        return NextResponse.json({ orders });

    } catch (err) {
        console.error("Error fetching seller orders:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}