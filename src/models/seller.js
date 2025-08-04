const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  sellerName: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
});

module.exports = mongoose.model('Seller', sellerSchema);
