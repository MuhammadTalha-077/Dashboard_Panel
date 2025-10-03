const axios = require('axios');

async function test() {
  try {
    const r = await axios.post('http://localhost:5001/api/auth/login', { email: 'admin@example.com', password: 'pass123' }, { timeout: 5000 });
    console.log('OK', r.status, r.data);
  } catch (e) {
    if (e.response) {
      console.error('RESP', e.response.status, e.response.data);
    } else {
      console.error('ERROR', e.message);
    }
  }
}

test();
