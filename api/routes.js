const express = require('express');
const router = express.Router();

const deezerRoutes = require('./deezerDataRoutes');
const discordRoutes = require('./discordRoutes');
const emailScrapingRoutes = require('./emailScrapingRoutes');

router.use('/deezer', deezerRoutes);
router.use('/discord', discordRoutes);
router.use('/emailScraping', emailScrapingRoutes);

module.exports = router;