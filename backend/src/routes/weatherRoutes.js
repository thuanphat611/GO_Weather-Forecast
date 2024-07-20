const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/get-data', async (req, res) => {
  res.status(200).json({'status': 'ok'});
});

module.exports = router;