
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }  // Can store image URL or path
});

module.exports = mongoose.model('Item', itemSchema);
