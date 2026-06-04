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
   git clone [https://github.com/YOUR_USERNAME/TailCheck.git](https://github.com/YOUR_USERNAME/TailCheck.git)
   cd TailCheck
