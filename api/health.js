const { MongoClient } = require('mongodb');

module.exports = async (req, res) => {
  const path = req.url || '/';
  const now = new Date().toISOString();

  const result = {
    ok: true,
    time: now,
    node_env: process.env.NODE_ENV || 'production',
  };

  const mongoUri = process.env.MONGO_URI || process.env.MONGOURL || null;
  if (mongoUri) {
    try {
      const client = new MongoClient(mongoUri, { connectTimeoutMS: 3000, serverSelectionTimeoutMS: 3000 });
      await client.connect();
      await client.db().command({ ping: 1 });
      result.db = 'ok';
      client.close();
    } catch (err) {
      result.db = 'error';
      result.dbError = err.message;
    }
  } else {
    result.db = 'no-uri';
  }

  if (path.startsWith('/preview')) {
    res.setHeader('Content-Type', 'text/html');
    return res.end(`<!doctype html><html><head><meta charset="utf-8"><title>Status Preview</title><style>body{font-family:system-ui,Segoe UI,Roboto,Arial;background:#f6f8fa;padding:24px}pre{background:#fff;border:1px solid #e1e4e8;padding:12px;border-radius:6px}</style></head><body><h1>API Status</h1><p>Time: ${now}</p><pre>${JSON.stringify(result, null, 2)}</pre></body></html>`);
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(result));
};
