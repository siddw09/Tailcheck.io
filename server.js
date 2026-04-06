require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public')));

// --- UPDATED IMPORT ---
// Added 'getFlightStatus' to the list of imports from your service file
const { getAircraftData, getAircraftImage, calculateAge, getFlightStatus } = require('./src/services/aviationApi');

app.get('/api/aircraft/:tailNumber', async (req, res) => {
    const { tailNumber } = req.params;

    try {
        // --- UPDATED PROMISE.ALL ---
        // Now running THREE API calls at once: Data, Image, and Flight History
        const [rawDetails, imageUrl, flightInfo] = await Promise.all([
            getAircraftData(tailNumber),
            getAircraftImage(tailNumber),
            getFlightStatus(tailNumber) // <--- New call added here
        ]);

        if (!rawDetails) {
            return res.status(404).json({ error: true, message: "Aircraft details not found." });
        }

        // Clean up the data for the Frontend
        const finalData = {
            tailNumber: rawDetails.registration_number,
            icao24: rawDetails.icao_24bit || rawDetails.icao24 || null,
            airline: rawDetails.airline_name || "Private / Unknown",
            modelName: rawDetails.model_name || rawDetails.plane_series || "Unknown Model",
            age: calculateAge(rawDetails.delivery_date, rawDetails.production_line),
            countryRegistration: rawDetails.registration_country || "N/A",
            imageUrl: imageUrl || "https://via.placeholder.com/600x400?text=No+Photo+Found",
            
            // --- NEW FIELD ADDED ---
            // If flightInfo is null, it provides a safe fallback object
            lastFlight: flightInfo || { status: "No recent data", origin: "Unknown", destination: "Unknown" }
        };

        res.json(finalData);

    } catch (error) {
        console.error("Server Route Error:", error);
        res.status(500).json({ error: true, message: "Internal System Error" });
    }
});

// MongoDB Connection (Commented out for now as per your code)
/*
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));
*/

app.listen(PORT, () => {
    console.log(`🚀 Server flying on http://localhost:${PORT}`);
});