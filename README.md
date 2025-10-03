# MERN Admin Backend (Express + MongoDB)

This is a starter backend for a MERN Admin Dashboard for e-commerce sites.

Features
- Express REST API
- Mongoose models for User, Product, Order
- JWT authentication + admin middleware
- Seed script to create an admin user and sample products
- Vercel-compatible serverless wrapper (api/index.js)

Quick start
1. Copy `.env.example` to `.env` and fill in MONGO_URI and JWT_SECRET

2. Install deps:

```
# in PowerShell
npm install
```

3. Seed sample data (creates an admin user, email: admin@example.com, password: pass123):

```
npm run seed
```

4. Run dev server:

```
npm run dev
```

Deploying to Vercel
- This project includes `api/index.js` which wraps the Express app with serverless-http.
- Set the environment variables on Vercel (`MONGO_URI`, `JWT_SECRET`).

Migration note (if upgrading from older repo using `isAdmin`):
- A migration script is provided to convert any existing `isAdmin` boolean fields into the new `role` enum.
- Run `npm run migrate` after setting `.env` so your existing admin users keep their privileges.

Vercel deployment checklist
- Ensure `.env` variables are set in Vercel (Production and Preview): `MONGO_URI`, `JWT_SECRET`.
- The `api` folder contains `index.js` which Vercel will expose as serverless functions under `/api/*`.
- You can run `vercel dev` locally (requires Vercel CLI) to emulate deployment: `npm run vercel-dev`.

Vercel deployment steps
1. Install Vercel CLI and login (`npm i -g vercel` then `vercel login`).
2. From the project root run `vercel` and follow prompts. Choose "No" when asked to link to an existing project if you want a new one.
3. In the Vercel dashboard, set the environment variables for Production and Preview: `MONGO_URI` and `JWT_SECRET`.
4. Vercel will detect the `api` folder and deploy the serverless functions. The Express app will be exposed under `/api/*` routes.

Notes on cold starts and DB connections
- The `api/index.js` wrapper ensures the MongoDB connection is initiated on function cold starts. Use a managed MongoDB (MongoDB Atlas) or a database reachable from Vercel.

Notes
- This is a backend skeleton; after it's live we'll build the React admin UI and connect it to these endpoints.
