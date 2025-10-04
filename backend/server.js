require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./backend/src/config/db');

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    if (require.main === module) {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
  })
  .catch((err) => {
    console.error('Failed to connect to DB', err);
    process.exit(1);
  });

module.exports = app;
