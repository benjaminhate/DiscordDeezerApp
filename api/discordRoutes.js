const express = require('express');
const router = express.Router();

const data = require('../data');
const discord = require('../discord');

router.get('/generate/:user/:year/:month', async (req, res) => {
    let month = await data.cosmos.users.findUserMonth(req.params.user, req.params.year, req.params.month);
    res.send({
        msg: discord.message.generateMonthlyMessage(month)
    });
});

router.get('/generate/:user1/:year1/:month1/compare/:user2/:year2/:month2', async (req, res) => {
    let month1 = await data.cosmos.users.findUserMonth(req.params.user1, req.params.year1, req.params.month1);
    let month2 = await data.cosmos.users.findUserMonth(req.params.user2, req.params.year2, req.params.month2);
    res.send({
        msg: discord.message.generateCompareMonthlyMessage(month1, month2)
    });
});

router.post('/send/:user/:year/:month', async (req, res) => {
    let month = await data.cosmos.users.findUserMonth(req.params.user, req.params.year, req.params.month);
    let message = discord.message.generateMonthlyMessage(month);
    await discord.webhook.sendMessage(message);
    res.send({
        msg: "Message Discord sent"
    });
});

router.post('/send/:user1/:year1/:month1/compare/:user2/:year2/:month2', async (req, res) => {
    let month1 = await data.cosmos.users.findUserMonth(req.params.user1, req.params.year1, req.params.month1);
    let month2 = await data.cosmos.users.findUserMonth(req.params.user2, req.params.year2, req.params.month2);
    let message = discord.message.generateCompareMonthlyMessage(month1, month2);
    await discord.webhook.sendMessage(message);
    res.send({
        msg: "Message Discord sent"
    });
});

module.exports = router;