require('dotenv').config();
const connectDB = require('../src/config/db');
const User = require('../src/models/User');

const migrate = async () => {
  try {
    await connectDB();
    console.log('Connected to DB');

    // If there are documents with isAdmin field, update them
    const res1 = await User.updateMany({ isAdmin: true }, { $set: { role: 'admin' }, $unset: { isAdmin: '' } });
    const res2 = await User.updateMany({ isAdmin: { $exists: true, $ne: true } }, { $set: { role: 'user' }, $unset: { isAdmin: '' } });

    console.log('Migration results:', { adminsUpdated: res1.modifiedCount, otherUpdated: res2.modifiedCount });
    process.exit(0);
  } catch (err) {
    console.error('Migration failed', err);
    process.exit(1);
  }
};

migrate();
