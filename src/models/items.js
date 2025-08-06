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
  image: { type: String },
  reviews: [reviewSchema],
  stars: { type: Number, default: 0 }, // average rating
}, { timestamps: true });


export default mongoose.models.Item || mongoose.model("Item", itemSchema);