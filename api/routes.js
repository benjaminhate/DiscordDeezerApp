const express = require('express');
const router = express.Router();

const deezerRoutes = require('./deezerDataRoutes.js');
const discordRoutes = require('./discordRoutes.js');

router.use('/deezer', deezerRoutes);
router.use('/discord', discordRoutes);

module.exports = router;