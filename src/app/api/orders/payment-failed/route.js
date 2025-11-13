import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function PUT(req) {
    await dbConnect();
    try {
        const token = cookies().get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const { internal_order_ids } = await req.json();

        if (!internal_order_ids || !Array.isArray(internal_order_ids)) {
            return NextResponse.json({ error: "Invalid order IDs" }, { status: 400 });
        }

        // Find the "Pending" orders and update them
        await Order.updateMany(
            { 
                _id: { $in: internal_order_ids }, 
                userId: userId,
                status: 'Pending' // Only update orders that are still pending
            },
            {
                $set: {
                    status: "Payment Failed"
                },
                $push: {
                    statusHistory: { status: "Payment Failed", timestamp: new Date() }
                }
            }
        );

        return NextResponse.json({ message: "Order status updated to Payment Failed" });

    } catch (err) {
        console.error("Payment failure update error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}