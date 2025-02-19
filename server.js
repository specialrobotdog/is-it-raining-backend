const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// OpenWeatherMap API (Replace with your actual API key)
const WEATHER_API_KEY = "0e3442cf34d7c4281dd2aab37f3fa310";
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=${0e3442cf34d7c4281dd2aab37f3fa310}&units=metric`;

async function isItRaining() {
    try {
        const response = await axios.get(WEATHER_API_URL);
        const weather = response.data.weather[0].main.toLowerCase();
        return { raining: weather.includes("rain") };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return { raining: false };
    }
}

// Define API Route
app.get('/status', async (req, res) => {
    const status = await isItRaining();
    res.json(status);
});

// Ensure Vercel detects this as a backend API
module.exports = app;

// Start Server (Only for local testing)
if (require.main === module) {
    app.listen(PORT, () => console.log(`🚀 Weather API running on port ${PORT}`));
}
