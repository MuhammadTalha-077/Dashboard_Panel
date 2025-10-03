# MERN Admin Frontend

This is a Vite + React + MUI admin UI for the MERN Admin Backend.

Quick start
1. Create `.env` with `VITE_API_URL` if your backend is hosted somewhere (for local dev with the backend on port 5000 use `VITE_API_URL=http://localhost:5000`).
2. Install deps:

```
# in PowerShell
cd frontend; npm install
```

3. Run dev server:

```
npm run dev
```

Deploy to Vercel
- Run `vercel` from the `frontend` folder and set `VITE_API_URL` in the Vercel dashboard to your backend URL (e.g., `https://your-backend.vercel.app`).
