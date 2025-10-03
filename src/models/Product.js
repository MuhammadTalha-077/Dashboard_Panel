const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true, default: 0 },
  countInStock: { type: Number, required: true, default: 0 },
  images: [{ type: String }],
  category: { type: String },
  brand: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
