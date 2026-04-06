let aircraftMap;

// --- THE MISSING SEARCH FUNCTION ---
async function searchAircraft() {
    const tailNum = document.getElementById('tailSearch').value.trim().toUpperCase();
    const resultArea = document.getElementById('resultArea');

    if (!tailNum) {
        alert("Please enter a tail number");
        return;
    }

    // Show loading state and clear old cards
    resultArea.classList.remove('hidden');
    document.getElementById('basicInfoCard').innerHTML = `<p class="text-blue-400 animate-pulse">Scanning the skies...</p>`;
    document.getElementById('flightHistoryCard').innerHTML = "";

    try {
        const response = await fetch(`/api/aircraft/${tailNum}`);
        const data = await response.json();

        if (data.error) {
            document.getElementById('basicInfoCard').innerHTML = `<p class="text-red-400">Error: ${data.message}</p>`;
        } else {
            renderResult(data);
        }
    } catch (err) {
        document.getElementById('basicInfoCard').innerHTML = `<p class="text-red-400">Server Error. Please try again.</p>`;
    }
}

// --- RENDERING THE UI ---
function renderResult(data) {
    const resultArea = document.getElementById('resultArea');
    const basicInfo = document.getElementById('basicInfoCard');
    const flightHistory = document.getElementById('flightHistoryCard');

    resultArea.classList.remove('hidden');
    resultArea.classList.add('grid');

    // Render Left Column (Image & Stats)
    basicInfo.innerHTML = `
        <div class="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl">
            <img src="${data.imageUrl}" class="rounded-2xl w-full h-48 object-cover mb-6 border border-slate-600">
            <div class="flex justify-between items-center mb-2">
                <h3 class="text-4xl font-black">${data.tailNumber}</h3>
                <span class="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg text-xs font-bold border border-blue-500/30">${data.countryRegistration}</span>
            </div>
            <p class="text-blue-400 font-bold text-lg mb-6">${data.airline}</p>
            <div class="grid grid-cols-1 gap-4">
                <div class="bg-slate-900/50 p-4 rounded-xl">
                    <span class="text-slate-500 text-xs uppercase block font-bold">Model</span>
                    <span class="text-xl font-bold">${data.modelName}</span>
                </div>
                <div class="bg-slate-900/50 p-4 rounded-xl">
                    <span class="text-slate-500 text-xs uppercase block font-bold">Airframe Age</span>
                    <span class="text-xl font-bold text-green-400">${data.age} Years</span>
                </div>
            </div>
        </div>
    `;

    // Render Flight History Card
    const flight = data.lastFlight || { status: "Unknown", origin: "N/A", destination: "N/A" };
    flightHistory.innerHTML = `
        <h4 class="text-xs uppercase text-slate-500 font-black mb-6 tracking-widest flex items-center gap-2">
            Last Known Operation
        </h4>
        <div class="flex justify-between items-center">
            <div class="text-left">
                <p class="text-3xl font-black">${flight.originIata || flight.origin || '???'}</p>
                <p class="text-sm text-slate-400">${flight.origin || 'Unknown Origin'}</p>
            </div>
            <div class="text-blue-500 text-2xl animate-bounce">✈️</div>
            <div class="text-right">
                <p class="text-3xl font-black">${flight.destinationIata || 'N/A'}</p>
                <p class="text-sm text-slate-400">${flight.destination || 'Unknown Destination'}</p>
            </div>
        </div>
        <div class="mt-6 pt-6 border-t border-slate-700 flex justify-between items-center">
            <span class="text-sm font-bold uppercase py-1 px-3 rounded-md bg-slate-700">${flight.status}</span>
            <span class="text-slate-500 text-xs font-mono">${flight.flightNumber || ''}</span>
        </div>
    `;

    initMap();
    
    if (data.icao24) {
        updateLivePosition(data.icao24);
    }
}

// --- MAP LOGIC ---
function initMap() {
    if (aircraftMap) {
        aircraftMap.remove(); // Clean up old map instance
    }
    // This looks for <div id="map">
    aircraftMap = L.map('map', { zoomControl: false }).setView([20, 0], 2);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(aircraftMap);
    setTimeout(() => { aircraftMap.invalidateSize(); }, 200);
}

async function updateLivePosition(icao24) {
    const mapContainer = document.getElementById('map');
    
    if (!icao24) {
        console.log("No ICAO24 hex code available for this plane.");
        mapContainer.innerHTML = `<div class="flex items-center justify-center h-full text-slate-500 italic">Live tracking unavailable for this tail</div>`;
        return;
    }

    try {
        const response = await fetch(`https://opensky-network.org/api/states/all?icao24=${icao24.toLowerCase()}`);
        const result = await response.json();
        
        if (result.states && result.states.length > 0) {
            const [icao, callsign, country, time, last_pos, lon, lat] = result.states[0];
            aircraftMap.setView([lat, lon], 7);
            L.marker([lat, lon]).addTo(aircraftMap).bindPopup(`<b>${callsign || 'In Flight'}</b>`).openPopup();
        } else {
            // If the plane isn't in the air, OpenSky returns nothing. 
            // We show a message instead of an empty map.
            mapContainer.insertAdjacentHTML('afterbegin', `
                <div class="absolute inset-0 z-[1001] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
                    <p class="text-white font-bold bg-slate-800 p-4 rounded-xl shadow-2xl border border-slate-700">
                        📡 Aircraft currently out of radar range
                    </p>
                </div>
            `);
        }
    } catch (e) {
        console.error("OpenSky API unreachable", e);
    }
}