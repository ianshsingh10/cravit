import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order";
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

        const { orderId } = await req.json();
        const order = await Order.findById(orderId);

        if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

        if (order.userId.toString() !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        if (!['Pending'].includes(order.status)) {
            return NextResponse.json({ error: `Cannot cancel an order with status: ${order.status}` }, { status: 400 });
        }

        order.status = 'Cancelled';
        order.statusHistory.push({ status: 'Cancelled' });
        await order.save();
        await order.populate({ path: 'sellerId', select: 'name' });

        return NextResponse.json({ message: "Order cancelled successfully", order });

    } catch (err) {
        console.error("Order cancellation error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}