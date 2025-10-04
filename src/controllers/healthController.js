const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const pkg = require('../../package.json');

const formatBytes = (bytes) => {
  if (!bytes && bytes !== 0) return 'n/a';
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

exports.healthJson = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();
    const dbState = mongoose.connection.readyState; // 1 = connected
    const mem = process.memoryUsage();

    res.json({
      ok: true,
      time: new Date().toISOString(),
      uptime_seconds: Math.floor(process.uptime()),
      node: process.version,
      env: process.env.NODE_ENV || 'development',
      version: pkg.version || 'unknown',
      db: dbState === 1 ? 'connected' : 'disconnected',
      counts: { users, products, orders },
      memory: { rss: formatBytes(mem.rss), heapTotal: formatBytes(mem.heapTotal), heapUsed: formatBytes(mem.heapUsed) }
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

exports.statusPreview = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();
    const dbState = mongoose.connection.readyState;
    const html = `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Backend Status Preview</title>
          <style>body{font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial;background:#f6f8fa;color:#111;padding:24px}h1{margin:0 0 12px}pre{background:#fff;border:1px solid #e1e4e8;padding:12px;border-radius:6px}</style>
        </head>
        <body>
          <h1>Backend Status Preview</h1>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
          <p><strong>Node:</strong> ${process.version} — <strong>Env:</strong> ${process.env.NODE_ENV || 'development'}</p>
          <p><strong>DB:</strong> ${dbState === 1 ? 'connected' : 'disconnected'}</p>
          <h2>Counts</h2>
          <pre>Users: ${users}\nProducts: ${products}\nOrders: ${orders}</pre>
          <p>Version: ${pkg.version || 'unknown'}</p>
        </body>
      </html>`;
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (err) {
    res.status(500).send(`<pre>Error: ${err.message}</pre>`);
  }
};
