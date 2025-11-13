import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/cart";
import Order from "@/models/order";
import Counter from "@/models/counter";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";

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

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

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
        
        // This is the correct logic: Clear the cart *before* creating the order.
        await Cart.deleteMany({ userId });
        
        const ordersBySeller = {};
        let finalGrandTotal = 0; 
        
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

        const createdOrders = [];
        const datePrefix = getFormattedDate();
        
        for (const sellerId in ordersBySeller) {
            const orderData = ordersBySeller[sellerId];
            const sequenceNumber = await getNextOrderSequence(datePrefix);
            const total = orderData.totalBeforeFees;
            const upiCharges = (total / 0.965) - total;
            const grandTotal = total + upiCharges;
            finalGrandTotal += grandTotal;

            const newOrder = new Order({
                userId,
                sellerId: orderData.sellerId,
                items: orderData.items,
                orderNumber: `C-${datePrefix}-${sequenceNumber}`,
                status: 'Pending',
                statusHistory: [{ status: 'Pending' }],
                upiCharges: upiCharges,
                totalAmount: grandTotal, 
            });
            const savedOrder = await newOrder.save();
            createdOrders.push(savedOrder);
        }
        
        const shortTimestamp = Date.now().toString().slice(-9);
        const receipt = `rcpt_${userId}_${shortTimestamp}`;
        const options = {
            amount: Math.round(finalGrandTotal * 100),
            currency: "INR",
            receipt: receipt,
            notes: {
                database_order_ids: JSON.stringify(createdOrders.map(o => o._id))
            }
        };

        const razorpayOrder = await razorpay.orders.create(options);
        
        return NextResponse.json({
            message: "Razorpay order created",
            key_id: process.env.RAZORPAY_KEY_ID,
            order: razorpayOrder,
            internal_order_ids: createdOrders.map(o => o._id) 
        });

    } catch (err) {
        console.error("Order creation error:", err);
        return NextResponse.json({ error: "Internal server error during checkout." }, { status: 500 });
    }
}