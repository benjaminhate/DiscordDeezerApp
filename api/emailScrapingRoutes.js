const express = require('express');
const router = express.Router();

const { eml } = require('../email_scraping');

router.post('/data', async (req, res) => {
    let data = await eml.scrapAsync(req.files.email.data);
    return res.status(200).send(data);
});

module.exports = router;