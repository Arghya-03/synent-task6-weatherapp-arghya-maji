
require("dotenv").config();

const express = require("express");

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

app.get("/api/weather", async (req, res) => {
    try {
        const city = req.query.city;

        if (!city) {
            return res.status(400).json({ error: "City is required." });
        }

        const apiKey = process.env.OPENWEATHER_API_KEY;

        if (!apiKey) {
            return res.status(500).json({
                error: "Weather API key is not configured on the server."
            });
        }

        const url = new URL(
            "https://api.openweathermap.org/data/2.5/weather"
        );

        url.search = new URLSearchParams({
            q: city,
            appid: apiKey,
            units: "metric"
        });

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                error: data.message || "Unable to fetch weather data."
            });
        }

        res.json(data);
    } catch (error) {
        console.error("Weather API error:", error.message);
        res.status(502).json({ error: "Weather service unavailable." });
    }
});

app.get("/api/city-photo", async (req, res) => {
    try {
        const { city, country } = req.query;

        if (!city || !country) {
            return res.status(400).json({
                error: "City and country are required."
            });
        }

        const url = new URL("https://a12.click/search");

        url.search = new URLSearchParams({
            q: `${city} ${country} famous landmarks cityscape`,
            k: "3"
        });

        const response = await fetch(url);
        const data = await response.text();

        res.status(response.status);
        res.type("application/json").send(data);
    } catch (error) {
        console.error("City photo error:", error.message);
        res.status(502).json({ error: "City photo service unavailable." });
    }
});

app.listen(PORT, () => {
    console.log(`WeatherNow server running at http://localhost:${PORT}`);
});
