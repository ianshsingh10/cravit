import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // This will be the date, e.g., 'order_20250916'
    sequence_value: { type: Number, default: 0 }
});

export default mongoose.models.Counter || mongoose.model("Counter", counterSchema);