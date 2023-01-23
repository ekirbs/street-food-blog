const axios = require('axios')
const router = require('express').Router();
require('dotenv').config();



router.get('/', async (req, res) => {
    // console.log('GET all weather info');
    try {
        const weatherApiKey = process.env.weatherApiKey;
        const units = "imperial";
        const lang = "en";
        const weatherApiURL = `https://api.openweathermap.org/data/2.5/forecast?q=Boston&appid=${weatherApiKey}&units=${units}&lang=${lang}`;
        const response = await axios.get(weatherApiURL);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
