const Order = require('../models/Order');
const Product = require('../models/Product');

exports.summary = async (req, res) => {
  // total orders, total sales, orders per day
  const orders = await Order.aggregate([
    { $group: { _id: null, totalSales: { $sum: '$totalPrice' }, numOrders: { $sum: 1 } } }
  ]);
  const productsCount = await Product.countDocuments();
  res.json({ summary: orders[0] || { totalSales: 0, numOrders: 0 }, productsCount });
};
