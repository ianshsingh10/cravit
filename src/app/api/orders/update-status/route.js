import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
// ++ IMPORTS FOR EMAIL NOTIFICATION ++
import { sendEmail } from "@/lib/sendEmail";
import { createOrderStatusUpdateEmail } from "@/lib/createOrderStatusUpdateEmail";

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

        const validStatuses = ['Pending', 'Accepted', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled', 'Refunded'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
        }

        const order = await Order.findById(orderId);
        if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

        if (order.sellerId.toString() !== sellerId) {
            return NextResponse.json({ error: "Forbidden: You do not own this order" }, { status: 403 });
        }

        // Update status and save to the database
        order.status = status;
        order.statusHistory.push({ status: status });
        await order.save();

        // Get user info to send the email
        await order.populate({ path: 'userId', select: 'name email' });
        
        // ++ START: ADDED FOR EMAIL NOTIFICATION ++
        const statusesToNotify = ['Accepted', 'Out for Delivery', 'Delivered', 'Cancelled', 'Refunded'];
        if (statusesToNotify.includes(status) && order.userId) {
            const userName = order.userId.name;
            const userEmail = order.userId.email;

            const emailSubject = `Update on Your Order #${orderId.slice(-8)}`;
            const emailHtml = createOrderStatusUpdateEmail(userName, orderId, status);

            // Send the email (no need to await if you don't want the API to wait)
            sendEmail({ to: userEmail, subject: emailSubject, html: emailHtml });
        }
        // ++ END: ADDED FOR EMAIL NOTIFICATION ++

        return NextResponse.json(order);
    } catch (err) {
        console.error("Error updating order status:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}