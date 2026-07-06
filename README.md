
# TAILCHECK | Aircraft Lifecycle & Live Tracker

TailCheck is a sophisticated full-stack web application designed for aviation enthusiasts and researchers. It allows users to track any aircraft's history, technical specifications, and live flight status using global registration (Tail) numbers.


##  Features

* **Real-time Aircraft Lookup:** Instant data retrieval for thousands of aircraft globally.
* **Technical Specifications:** View airframe age, model series, and country of registration.
* **Live Radar Integration:** Interactive dark-mode map showing the real-time position of aircraft (powered by OpenSky Network).
* **Operational History:** View the last known flight operation, including origin and destination airports.
* **High-Res Imagery:** Dynamic aircraft photos fetched specifically for each tail number.

##  Tech Stack
A full-stack aircraft tracking monorepo with:

- `backend`: Express + TypeScript API layer
- `frontend`: Next.js App Router dashboard with Tailwind and shadcn-friendly primitives
- `shared`: Zod schemas and shared TypeScript types

* **APIs Integrated:**
    * **Aviationstack API:** Static aircraft data and flight history.
    * **Planespotters.net API:** Real-time aircraft photography.
    * **OpenSky Network API:** Live ADS-B state vectors for GPS tracking.
## Run

1. Install dependencies with `npm install`.
2. Start development with `npm run dev`.
##  Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/siddw09/TailCheck.git
   cd TailCheck

