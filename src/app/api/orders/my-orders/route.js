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
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const orders = await Order.find({ userId })
            .sort({ createdAt: -1 }) 
            .populate({
                path: 'sellerId',
                select: 'name image' 
            });

        return NextResponse.json({ orders });

    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        console.error("Error fetching user orders:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}