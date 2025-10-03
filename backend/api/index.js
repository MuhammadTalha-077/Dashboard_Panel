// Vercel serverless wrapper
require('dotenv').config();
const serverless = require('serverless-http');
const app = require('../src/app');
const connectDB = require('../backend/src/config/db');

// Keep a single DB connection promise across invocations to avoid reconnect storms
let connPromise = null;
const ensureDB = () => {
	if (!connPromise) {
		connPromise = connectDB().catch((err) => {
			// reset so future invocations can retry
			connPromise = null;
			throw err;
		});
	}
	return connPromise;
};

// Create serverless handler once
const handler = serverless(app);

module.exports = async (req, res) => {
	try {
		await ensureDB();
	} catch (err) {
		console.error('DB connection failed in serverless handler', err);
		res.statusCode = 500;
		return res.end('Database connection failed');
	}
	return handler(req, res);
};
