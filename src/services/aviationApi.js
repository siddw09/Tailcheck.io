const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.AVIATIONSTACK_KEY;
const BASE_URL = 'http://api.aviationstack.com/v1';

// Function A: Get Technical Data (Age, Airline, Country)
async function getAircraftData(tailNumber) {
    try {
        const response = await axios.get(`${BASE_URL}/airplanes`, {
            params: { access_key: API_KEY, registration_number: tailNumber }
        });
        return response.data.data[0] || null;
    } catch (error) {
        console.error("AviationStack Error:", error.message);
        return null;
    }
}

// Function B: Get the Real Image (Planespotters)
async function getAircraftImage(tailNumber) {
    try {
        const url = `https://api.planespotters.net/pub/photos/reg/${tailNumber}`;
        const response = await axios.get(url);
        if (response.data && response.data.photos.length > 0) {
            return response.data.photos[0].thumbnail_large.src;
        }
        return null;
    } catch (error) {
        return null; 
    }
}

// Function C: Calculate Age Logic
function calculateAge(deliveryDate, productionLine) {
    const currentYear = new Date().getFullYear();
    if (deliveryDate) {
        const year = new Date(deliveryDate).getFullYear();
        return currentYear - year;
    }
    if (productionLine) {
        // Often looks like "2015-06"
        const year = parseInt(productionLine.substring(0, 4));
        return currentYear - year;
    }
    return "Unknown";
}

// Function D: Get Flight History / Current Status
async function getFlightStatus(tailNumber) {
    try {
        const response = await axios.get(`http://api.aviationstack.com/v1/flights`, {
            params: {
                access_key: process.env.AVIATIONSTACK_KEY,
                registration_number: tailNumber
            }
        });

        if (response.data && response.data.data.length > 0) {
            const lastFlight = response.data.data[0]; // Get the most recent flight
            return {
                status: lastFlight.flight_status,
                origin: lastFlight.departure.airport,
                originIata: lastFlight.departure.iata, // <-- Make          sure this matches!
                destination: lastFlight.arrival.airport,
                destinationIata: lastFlight.arrival.iata, // <-- Make           sure this matches!
                flightNumber: lastFlight.flight.iata
            };
        }
        return null;
    } catch (error) {
        return null;
    }
}
// Add getFlightStatus to the list of exported functions
module.exports = { getAircraftData, getAircraftImage, calculateAge, getFlightStatus };