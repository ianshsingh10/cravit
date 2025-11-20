import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, trim: true },
}, { timestamps: true });

const itemSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sellerName: { type: String, required: true },
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
  availability:{ type: Boolean, default: true},
  image: { type: String},
  category:{type: String},
  reviews: [reviewSchema],  
  rating: { type: Number, default: 0 },
  numReviews: { type: Number},
}, { timestamps: true });


export default mongoose.models.Item || mongoose.model("Item", itemSchema);