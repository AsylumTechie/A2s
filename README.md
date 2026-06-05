# A2S eCommerce Solutions

Full-stack MERN web application for **A2S eCommerce Solutions** — a digital growth partner offering website development, digital marketing, graphic branding, e-commerce setup, and Amazon/eCommerce seller central management services (Jaipur, India).

Built from the company brochure and service proposal PDFs with demo content.

## Tech Stack

- **MongoDB** — Database for contacts, inquiries, and services
- **Express.js** — REST API backend
- **React (Vite)** — Frontend SPA with React Router
- **Node.js** — Server runtime
- **Tailwind CSS v4** — Responsive, modern UI

## Features

- Responsive landing page with hero, stats, services, testimonials, and team
- About page with mission, vision, and values
- Services catalog with category filtering (API-driven)
- Individual service detail pages
- Seller Central management page (16 services + ₹999/month plan from proposal)
- Contact form and service inquiry forms (saved to MongoDB)
- Mobile-friendly navigation

## Project Structure

```
A2S/
├── client/          # React + Vite frontend
├── server/          # Express API + MongoDB
├── package.json     # Root scripts (run both together)
└── README.md
```

## Prerequisites

- Node.js 18+
- MongoDB running locally (or update `MONGODB_URI` in `server/.env`)

## Setup

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Configure environment

Copy or edit `server/.env`:

```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/a2s_ecommerce
CLIENT_URL=http://localhost:5173
```

### 3. Seed demo services (requires MongoDB)

```bash
npm run seed
```

### 4. Run development servers

```bash
npm run dev
```

- **Frontend:** http://localhost:5173
- **API:** http://localhost:5000/api

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/stats` | Company stats (500+ clients, etc.) |
| GET | `/api/services` | List services (`?category=`, `?featured=true`) |
| GET | `/api/services/:slug` | Single service |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/inquiries` | Submit service inquiry |

## Production Build

```bash
cd client && npm run build
cd ../server && npm start
```

Serve the `client/dist` folder via Express static middleware or a separate host; set `VITE_API_URL` to your production API URL.

## Company Info (from PDFs)

- **Phone:** +91-8504823748
- **Email:** info@a2secommercesolution.com
- **Website:** www.a2secommercesolution.com
- **UDYAM:** UDYAM-RJ-17-0312662

## License

Private — A2S eCommerce Solutions
