const axios = require('axios') //back end fetches in promises
const router = require('express').Router();
require('dotenv').config();

// .env will hide the api key
//the actual route is /api/weather/
router.get('/', async (req, res) => {
    console.log('GET all weather info');
    try {
        const weatherApiKey = process.env.weatherApiKey; // move any apiKeys, even simple ones, to .env
        const units = "imperial";
        const lang = "en";
        const weatherApiURL = `https://api.openweathermap.org/data/2.5/forecast?q=Boston&appid=${weatherApiKey}&units=${units}&lang=${lang}`;
        const response = await axios.get(weatherApiURL);
        // console.log(response);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
