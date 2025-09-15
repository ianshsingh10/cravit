const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  service: { type: String, enum: ['dine-in', 'parcel'], required: true },
  sellerName: { type: String, required: true }
});

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);