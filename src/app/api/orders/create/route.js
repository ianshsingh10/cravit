import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/cart";
import Order from "@/models/order";
import Counter from "@/models/counter";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
};

async function getNextOrderSequence(datePrefix) {
    const counterId = `order_${datePrefix}`;
    const counter = await Counter.findByIdAndUpdate(
        counterId,
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );
    return counter.sequence_value;
}

export async function POST(req) {
    await dbConnect();
    try {
        const cookie = await cookies();
        const token = cookie.get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const cartItems = await Cart.find({ userId }).populate('itemId');
        if (cartItems.length === 0) {
            return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
        }
        
        for (const cartItem of cartItems) {
            if (!cartItem.itemId?.availability) {
                return NextResponse.json({ 
                    error: `Sorry, "${cartItem.itemName}" is no longer available. Please remove it from your cart.` 
                }, { status: 400 });
            }
        }

        const ordersBySeller = {};
        for (const cartItem of cartItems) {
            if (!cartItem.itemId || !cartItem.itemId.sellerId) {
                console.warn(`Skipping cart item with missing data: ${cartItem._id}`);
                continue;
            }
            const sellerId = cartItem.itemId.sellerId.toString();
            if (!ordersBySeller[sellerId]) {
                ordersBySeller[sellerId] = { sellerId, items: [], totalBeforeFees: 0 };
            }
            
            ordersBySeller[sellerId].items.push({
                itemId: cartItem.itemId._id,
                itemName: cartItem.itemName,
                price: cartItem.price,
                quantity: cartItem.quantity,
                service: cartItem.service
            });

            const itemPrice = cartItem.price * cartItem.quantity;
            const parcelCharge = cartItem.service === 'parcel' ? 10 * cartItem.quantity : 0;
            ordersBySeller[sellerId].totalBeforeFees += (itemPrice + parcelCharge);
        }

        const createdOrdersPromises = [];
        const datePrefix = getFormattedDate();
        
        for (const sellerId in ordersBySeller) {
            const orderData = ordersBySeller[sellerId];
            
            const sequenceNumber = await getNextOrderSequence(datePrefix);
            
            const total = orderData.totalBeforeFees;
            const upiCharges = (total / 0.965) - total;
            const grandTotal = total + upiCharges;

            const newOrder = new Order({
                userId,
                sellerId: orderData.sellerId,
                items: orderData.items,
                orderNumber: `${datePrefix}-C-${sequenceNumber}`,
                status: 'Pending',
                upiCharges: upiCharges,
                totalAmount: grandTotal, 
            });
            createdOrdersPromises.push(newOrder.save());
        }
        
        await Promise.all(createdOrdersPromises);
        await Cart.deleteMany({ userId });

        return NextResponse.json({ message: "Order placed successfully!", orderCount: createdOrdersPromises.length });

    } catch (err) {
        console.error("Order creation error:", err);
        return NextResponse.json({ error: "Internal server error during checkout." }, { status: 500 });
    }
}