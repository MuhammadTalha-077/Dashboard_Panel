require('dotenv').config();
const connectDB = require('../src/config/db');
const User = require('../src/models/User');
const Product = require('../src/models/Product');

const seed = async () => {
  try {
    await connectDB();
    await User.deleteMany();
    await Product.deleteMany();

    // create a superadmin user for full control
    const admin = await User.create({
      name: 'Super Admin',
      email: 'admin@example.com',
      password: 'pass123',
      role: 'superadmin'
    });

    const products = [
      { name: 'T-Shirt', description: 'Comfortable cotton t-shirt', price: 19.99, countInStock: 100, category: 'Apparel', brand: 'Acme' },
      { name: 'Sneakers', description: 'Running sneakers', price: 79.99, countInStock: 50, category: 'Footwear', brand: 'Sprint' },
      { name: 'Coffee Mug', description: 'Ceramic mug', price: 9.5, countInStock: 200, category: 'Home', brand: 'Mornings' }
    ];

    await Product.insertMany(products);

    console.log('Seed complete');
    console.log('Admin credentials: email=admin@example.com password=pass123');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
