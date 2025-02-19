const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// OpenWeatherMap API (Replace with your actual API key)
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=${WEATHER_API_KEY}&units=metric`;

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
app.get('/', (req, res) => {
    res.send('Backend is running! Go to <a href="/status">/status</a> to check the rain status.');
});

// Ensure Vercel detects this as a backend API
module.exports = app;

// Start Server (Only for local testing)
if (require.main === module) {
    app.listen(PORT, () => console.log(`🚀 Weather API running on port ${PORT}`));
}
