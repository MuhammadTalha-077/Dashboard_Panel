#!/usr/bin/env node
require('dotenv').config();
const axios = require('axios');

// Usage: set env vars or create a .env with API_URL, ADMIN_EMAIL, ADMIN_PASS
const API_URL = process.env.API_URL || 'https://your-deployed-site.vercel.app/api';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASS = process.env.ADMIN_PASS || 'pass123';

const log = console.log;

async function run() {
  log('Post-deploy check starting...');
  try {
    // 1) Login
    const loginRes = await axios.post(`${API_URL}/auth/login`, { email: ADMIN_EMAIL, password: ADMIN_PASS }, { timeout: 10000 });
    const token = loginRes.data.token;
    log('Login: OK — token received');

    const headers = { Authorization: `Bearer ${token}` };

    // 2) Get users (admin-only)
    try {
      const usersRes = await axios.get(`${API_URL}/users`, { headers, timeout: 10000 });
      log(`GET /users: ${Array.isArray(usersRes.data) ? usersRes.data.length + ' users' : 'OK'}`);
    } catch (err) {
      log('GET /users: FAILED', err.response?.status, err.response?.data || err.message);
    }

    // 3) Get summary (admin-only)
    try {
      const summaryRes = await axios.get(`${API_URL}/stats/summary`, { headers, timeout: 10000 });
      log('GET /stats/summary: OK', summaryRes.data);
    } catch (err) {
      log('GET /stats/summary: FAILED', err.response?.status, err.response?.data || err.message);
    }

    log('Post-deploy check finished. Review results above.');
    process.exit(0);
  } catch (err) {
    log('Post-deploy check failed at login:', err.response?.status, err.response?.data || err.message);
    process.exit(2);
  }
}

run();
