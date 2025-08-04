
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  sellerName: { type: String, required: true }
});

module.exports = mongoose.model('Cart', cartSchema);
