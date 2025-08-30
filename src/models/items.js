const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewer: { type: String },
  comment: { type: String },
  rating: { type: Number, min: 1, max: 5 }
}, { timestamps: true });

const itemSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  sellerName: { type: String, required: true },
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
  availablibil:{ type: Boolean, default: true},
  image: { type: String},
  category:{type: String},
  reviews: [reviewSchema],
  rating: { type: Number, default: 0 },
}, { timestamps: true });


export default mongoose.models.Item || mongoose.model("Item", itemSchema);