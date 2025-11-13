import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  await dbConnect();
  try {
    const token = cookies().get("token")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      internal_order_ids,
    } = await req.json();

    // 1. Verify Payment Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid payment signature." },
        { status: 400 }
      );
    }

    // 2. Re-check item availability
    const orders = await Order.find({
      _id: { $in: internal_order_ids },
      userId: userId,
    }).populate("items.itemId");
    let itemUnavailable = null;
    for (const order of orders) {
      for (const orderItem of order.items) {
        if (!orderItem.itemId || !orderItem.itemId.availability) {
          itemUnavailable = orderItem.itemName;
          break;
        }
      }
      if (itemUnavailable) break;
    }

    // 3. Handle if an item went out of stock
    if (itemUnavailable) {
      await Order.updateMany(
        { _id: { $in: internal_order_ids } },
        {
          $set: { status: "Cancelled" },
          $push: { statusHistory: { status: "Cancelled" } },
        }
      );
      try {
        const payment = await razorpay.payments.fetch(razorpay_payment_id);
        await razorpay.payments.refund(razorpay_payment_id, {
          amount: payment.amount,
          speed: "optimum",
          notes: { reason: `Item ${itemUnavailable} out of stock.` },
        });
      } catch (refundError) {
        console.error("CRITICAL REFUND ERROR:", refundError);
      }
      return NextResponse.json(
        {
          error: `Sorry, "${itemUnavailable}" went out of stock. Your order has been cancelled and refunded.`,
        },
        { status: 400 }
      );
    }

    if (razorpay_payment_id === undefined || razorpay_payment_id === "") {
      await Order.updateMany(
        { _id: { $in: internal_order_ids }, userId: userId },
        {
          $set: {
            status: "Payment Failed",
            razorpay_payment_id: razorpay_payment_id,
          },
          $push: {
            statusHistory: { status: "Accepted", timestamp: new Date() },
          },
        }
      );
    }
    // 4. All good. Accept the order.
    await Order.updateMany(
      { _id: { $in: internal_order_ids }, userId: userId },
      {
        $set: { status: "Accepted", razorpay_payment_id: razorpay_payment_id },
        $push: { statusHistory: { status: "Accepted", timestamp: new Date() } },
      }
    );

    return NextResponse.json({
      message: "Payment verified and order accepted!",
    });
  } catch (err) {
    console.error("Payment verification error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
