const axios = require('axios') //back end fetches in promises
const router = require('express').Router();
require('dotenv').config();

// .env will hide the api key
//the actual route is /api/streetfood/
router.get('/', async (req, res) => {
    console.log('GET all street food info');
    try {
        const streetFoodApiUrl = `http://data.streetfoodapp.com/1.1/schedule/boston/`;
        const response = await axios.get(streetFoodApiUrl);
        // console.log(response);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('*', (req, res) =>
res.render('404')
// res.sendFile(path.join(__dirname, '../404'))
);

module.exports = router;
