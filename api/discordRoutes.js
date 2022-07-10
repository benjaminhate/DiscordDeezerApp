const express = require('express');
const router = express.Router();

const data = require('../data');
const discord = require('../discord');

router.get('/generate/:user/:year/:month', (req, res) => {
    let user = data.users.findUser(req.params.user);
    let year = user.findYear(req.params.year);
    let month = year.findMonth(req.params.month);
    res.send({
        msg: discord.message.generateMonthlyMessage(month)
    });
});

router.get('/generate/:user1/:year1/:month1/compare/:user2/:year2/:month2', (req, res) => {
    let user1 = data.users.findUser(req.params.user1);
    let year1 = user1.findYear(req.params.year1);
    let month1 = year1.findMonth(req.params.month1);
    let user2 = data.users.findUser(req.params.user2);
    let year2 = user2.findYear(req.params.year2);
    let month2 = year2.findMonth(req.params.month2);
    res.send({
        msg: discord.message.generateCompareMonthlyMessage(month1, month2)
    });
});

router.post('/send/:user/:year/:month', async (req, res) => {
    let user = data.users.findUser(req.params.user);
    let year = user.findYear(req.params.year);
    let month = year.findMonth(req.params.month);
    let message = discord.message.generateMonthlyMessage(month);
    await discord.webhook.sendMessage(message);
    res.send("Message Discord sent");
});

router.post('/send/:user1/:year1/:month1/compare/:user2/:year2/:month2', async (req, res) => {
    let user1 = data.users.findUser(req.params.user1);
    let year1 = user1.findYear(req.params.year1);
    let month1 = year1.findMonth(req.params.month1);
    let user2 = data.users.findUser(req.params.user2);
    let year2 = user2.findYear(req.params.year2);
    let month2 = year2.findMonth(req.params.month2);
    let message = discord.message.generateCompareMonthlyMessage(month1, month2);
    await discord.webhook.sendMessage(message);
    res.send("Message Discord sent");
});

module.exports = router;