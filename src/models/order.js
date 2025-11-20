import mongoose from 'mongoose';
import { Pay } from 'twilio/lib/twiml/VoiceResponse';

const statusHistorySchema = new mongoose.Schema({
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
}, { _id: false });

const orderItemSchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    itemName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    service: { type: String, required: true },
    foodRating: { type: Number, default: 0 },
    review: { type: String, default: "" }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    upiCharges: { type: Number, required: true, default: 0 },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled', 'Refunded', 'Payment Failed'],
        default: 'Pending'
    },
    statusHistory: [statusHistorySchema],
    razorpay_payment_id: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", orderSchema);