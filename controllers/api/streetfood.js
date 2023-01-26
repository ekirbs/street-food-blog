const axios = require('axios');
const router = require('express').Router();
require('dotenv').config();

// .env will hide the api key
router.get('/', async (req, res) => {
    try {
        const streetFoodApiUrl = `http://data.streetfoodapp.com/1.1/schedule/boston/`;
        const response = await axios.get(streetFoodApiUrl);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
