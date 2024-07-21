const express = require('express');
const router = express.Router();
require('dotenv').config();

const { getData } = require('../services/weatherService');

//Route to get weather data of a location
router.get('/get-data', async (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({success: false, message: 'Location is missing.'});
  }

  const result = await getData(location);
  if (result.success) {
    res.status(200).json({...result});
  } else {
    res.status(400).json({...result});
  }
});

module.exports = router;