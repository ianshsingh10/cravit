import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
    await dbConnect();
    try {
        const cookie = await cookies();
        const token = cookie.get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const { orderId } = await req.json();
        const pastOrder = await Order.findById(orderId).populate('items.itemId');

        if (!pastOrder) return NextResponse.json({ error: "Order not found" }, { status: 404 });
        if (pastOrder.userId.toString() !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

        const itemsToAdd = [];
        for (const orderItem of pastOrder.items) {
            if (orderItem.itemId?.availability) {
                itemsToAdd.push({
                    userId,
                    itemId: orderItem.itemId._id,
                    itemName: orderItem.itemName,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    service: orderItem.service,
                    sellerName: orderItem.itemId.sellerName
                });
            }
        }
        
        if (itemsToAdd.length === 0) {
            return NextResponse.json({ message: "No available items from this order to add to your cart." });
        }
        
        const operations = itemsToAdd.map(item => {
            const { quantity, ...itemDataToSet } = item;
            
            return {
                updateOne: {
                    filter: { userId: item.userId, itemId: item.itemId, service: item.service },
                    update: { 
                        $inc: { quantity: quantity }, 
                        $set: itemDataToSet          
                    },
                    upsert: true,
                },
            };
        });

        await Cart.bulkWrite(operations);

        return NextResponse.json({ message: `${itemsToAdd.length} item(s) have been added to your cart.` });
    } catch (err) {
        console.error("Re-order error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}