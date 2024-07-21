const express = require('express');
const router = express.Router();
require('dotenv').config();

const { registerSubscription, verifyEmail, unsubscribeEmail, confirmUnsubscription } = require('../controllers/subscriptionController');

//Route to get email subscription
router.post('/register', registerSubscription);
router.post('/register-verification', verifyEmail);
router.post('/unsubscribe', unsubscribeEmail);
router.post('/unsubscribe-verification', confirmUnsubscription);

module.exports = router;