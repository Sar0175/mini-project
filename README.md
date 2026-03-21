# PulsePoint Pharmacy Locator

A full-stack pharmacy locator with a React frontend, Node.js backend, and MongoDB database. It supports nearby pharmacy search, map markers, medicine availability lookup, and an emergency mode that prioritizes urgent-care ready stores.

## Stack

- React + Vite frontend
- Express + Node.js backend
- MongoDB with Mongoose
- Google Maps JavaScript API for map rendering
- Normalized `medicines` and `pharmacyStocks` collections for availability search

## Features

- Search nearby pharmacies by current location
- Filter by pharmacy name or area
- Check medicine availability and stock counts
- Predict likely medicine availability with a lightweight scoring model when live stock is uncertain
- Suggest alternative medicines when the searched one is unavailable nearby
- View pharmacies on an interactive map with markers
- Center the map on the user's location and pin nearby pharmacies
- Enable emergency mode to prioritize emergency-capable pharmacies
- Use the emergency button to show the nearest pharmacies that are open now and the fastest driving route
- Deploy for free with Render (backend), Netlify (frontend), and MongoDB Atlas free tier

## Project Structure

- `client/` React application
- `server/` Express API and MongoDB models for pharmacies, medicines, and stock

## Setup

### 1. Install dependencies

```powershell
cd client
npm.cmd install
cd ..\server
npm.cmd install
```

### 2. Configure environment variables

```powershell
Copy-Item .env.example .env
```

Create these files:

- `client/.env` with `VITE_API_URL=http://localhost:5000/api`
- `client/.env` with:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

- Enable the Maps JavaScript API for your Google Cloud project and use that browser API key here.
- `server/.env` with:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/pharmacy_locator
```

### 3. Seed sample data

```powershell
cd server
npm.cmd run seed
```

### 4. Run the backend

```powershell
cd server
npm.cmd run dev
```

### 5. Run the frontend

```powershell
cd client
npm.cmd run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Free Deployment

### Backend on Render

This repo includes [render.yaml](C:\Users\2024\OneDrive\Desktop\mini project\render.yaml) for a free Render web service.

Render settings:

- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/api/health`

Required environment variables on Render:

- `MONGODB_URI` = your MongoDB Atlas connection string
- `CORS_ORIGIN` = your Netlify site URL, for example `https://your-site.netlify.app`
- `PORT` is handled by Render, but the blueprint already includes it

### Database on MongoDB Atlas Free Tier

Render and Netlify do not provide MongoDB hosting. Use a free [MongoDB Atlas](https://www.mongodb.com/atlas/database) cluster and place its connection string in `MONGODB_URI`.

After connecting Atlas, seed your database locally:

```powershell
cd server
npm.cmd run seed
```

Or run the same seed command in a temporary environment that points to your Atlas cluster.

### Frontend on Netlify

This repo includes [netlify.toml](C:\Users\2024\OneDrive\Desktop\mini project\netlify.toml) for Vite deployment and SPA routing.

Netlify settings:

- Base directory: `client`
- Build command: `npm run build`
- Publish directory: `client/dist`

Required environment variables on Netlify:

- `VITE_API_URL` = your Render backend URL plus `/api`, for example `https://pulsepoint-pharmacy-api.onrender.com/api`
- `VITE_GOOGLE_MAPS_API_KEY` = your browser Google Maps API key

### Deployment Order

1. Create a free MongoDB Atlas cluster.
2. Deploy the backend on Render and set `MONGODB_URI` plus `CORS_ORIGIN`.
3. Deploy the frontend on Netlify and set `VITE_API_URL` plus `VITE_GOOGLE_MAPS_API_KEY`.
4. Update `CORS_ORIGIN` on Render to your final Netlify domain if it changes.

### Notes

- Render free services can spin down after inactivity, so the first backend request may be slow.
- If Google Maps is restricted by referrer, add your Netlify domain in the Google Cloud console.
- If you import this repo directly into Render, the blueprint in `render.yaml` can prefill most backend settings.

## API

### `GET /api/pharmacies`

Query params:

- `lat` latitude
- `lng` longitude
- `radius` search radius in kilometers
- `query` pharmacy name or address search
- `medicine` medicine name to check availability
- `emergency` `true` to show emergency-service pharmacies only

Response highlights:

- `matchedAvailability` returns stock rows that match the searched medicine
- `stockPreview` returns a short list of medicines stocked by each pharmacy

### `GET /api/pharmacies/:id`

Returns full details for a pharmacy.
