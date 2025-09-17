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
        if (decoded.role !== 'seller') {
            return NextResponse.json({ error: "Forbidden: Access denied" }, { status: 403 });
        }
        const sellerId = decoded.id;

        const { orderId, status } = await req.json();

        // Validate that the status is a valid choice from your schema enum
        const validStatuses = ['Pending', 'Accepted', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled', 'Refunded'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
        }

        const order = await Order.findById(orderId);
        if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

        // Security check: Make sure the seller owns this order
        if (order.sellerId.toString() !== sellerId) {
            return NextResponse.json({ error: "Forbidden: You do not own this order" }, { status: 403 });
        }

        order.status = status;
        await order.save();

        // Repopulate user details before sending back for UI consistency
        await order.populate({ path: 'userId', select: 'name email' });

        return NextResponse.json(order);
    } catch (err) {
        console.error("Error updating order status:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}