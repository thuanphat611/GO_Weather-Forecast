const express = require('express');
const cors = require('cors'); 
const path = require('path');
require('dotenv').config(); 

const weatherRouter = require('./routes/weatherRoutes');
const subscriptionRouter = require('./routes/subscriptionRoutes');

const app = express();

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors()); // Enable CORS for frontend
app.use('/assets', express.static(path.join(__dirname, '../public')));// serves static files

app.use('/weather', weatherRouter);
app.use('/subscription', subscriptionRouter);

app.get('/', (req, res) => {
  res.status(200).json({ 'state': 'Online'});
})

module.exports = app;