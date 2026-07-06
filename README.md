<<<<<<< HEAD
# TailCheck Monorepo

A full-stack aircraft tracking monorepo with:

- `backend`: Express + TypeScript API layer
- `frontend`: Next.js App Router dashboard with Tailwind and shadcn-friendly primitives
- `shared`: Zod schemas and shared TypeScript types

## Stack

- Turbo monorepo orchestration
- pnpm workspaces
- Express backend
- Next.js frontend
- Tailwind CSS for styling
- Radix UI compatible component patterns

## Run

1. Install dependencies with `npm install`.
2. Start development with `npm run dev`.

## UI direction

The frontend is prepared for shadcn/ui and Radix UI. The recommended path is to keep the dashboard shell in `frontend/src/components/dashboard` and add reusable primitives in `frontend/src/components/ui`.

For a polished console-style UI, pair shadcn/ui primitives with custom Tailwind tokens, gradients, and a restrained color system rather than relying on default component styling.
=======
# TAILCHECK | Aircraft Lifecycle & Live Tracker

TailCheck is a sophisticated full-stack web application designed for aviation enthusiasts and researchers. It allows users to track any aircraft's history, technical specifications, and live flight status using global registration (Tail) numbers.

![TailCheck Preview](https://via.placeholder.com/800x400?text=TailCheck+Aviation+Dashboard)

##  Features

* **Real-time Aircraft Lookup:** Instant data retrieval for thousands of aircraft globally.
* **Technical Specifications:** View airframe age, model series, and country of registration.
* **Live Radar Integration:** Interactive dark-mode map showing the real-time position of aircraft (powered by OpenSky Network).
* **Operational History:** View the last known flight operation, including origin and destination airports.
* **High-Res Imagery:** Dynamic aircraft photos fetched specifically for each tail number.

##  Tech Stack

* **Frontend:** HTML5, **Tailwind CSS v4** (Modern JIT engine), JavaScript (ES6+).
* **Backend:** **Node.js**, Express.js.
* **Mapping:** Leaflet.js with CartoDB Dark Matter tiles.
* **APIs Integrated:**
    * **Aviationstack API:** Static aircraft data and flight history.
    * **Planespotters.net API:** Real-time aircraft photography.
    * **OpenSky Network API:** Live ADS-B state vectors for GPS tracking.

##  Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/siddw09/TailCheck.git](https://github.com/siddw09/TailCheck.git)
   cd TailCheck
>>>>>>> 54cd3e2707e3abf0b0b13287be9c8f5d9a06b2ca
