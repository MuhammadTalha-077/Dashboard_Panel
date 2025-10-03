const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  const body = req.body;
  const product = await Product.create(body);
  res.status(201).json(product);
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Product not found' });
  res.json(updated);
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const removed = await Product.findByIdAndDelete(id);
  if (!removed) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product removed' });
};

exports.listProducts = async (req, res) => {
  const { q, page = 1, limit = 20 } = req.query;
  const filter = q ? { name: { $regex: q, $options: 'i' } } : {};
  const skip = (Number(page) - 1) * Number(limit);
  const total = await Product.countDocuments(filter);
  const items = await Product.find(filter).skip(skip).limit(Number(limit));
  res.json({ total, page: Number(page), limit: Number(limit), items });
};

exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};
