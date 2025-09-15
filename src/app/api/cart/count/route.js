import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
    await dbConnect();
    try {
        const cookie = await cookies();
        const token = cookie.get("token")?.value;
        if (!token) {
            return NextResponse.json({ count: 0 }); // No user, no cart
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const count = await Cart.countDocuments({ userId: userId });
        
        return NextResponse.json({ count });

    } catch (err) {
        // If token is invalid or another error occurs, return 0
        return NextResponse.json({ count: 0 });
    }
}