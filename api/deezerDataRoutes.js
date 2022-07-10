const express = require('express');
const bodyParser = require('body-parser');
const data = require('../data');

const router = express.Router();

router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.send(data.users.data);
});

router.post('/', (req, res, next) => {
    data.users.fromJson(req.body);
    next();
});

router.get('/:user', (req, res) => {
    let user = data.users.findUser(req.params.user);
    res.send(user);
});

router.post('/:user', (req, res, next) => {
    let user = data.users.findUser(req.params.user);
    user.addYearlyData(req.body);
    next();
});

router.put('/:user', (req, res, next) => {
    let user = data.users.findUser(req.params.user);
    user.modify(req.body);
    next();
});

router.delete('/:user', (req, res, next) => {
    data.users.deleteUser(req.params.user);
    next();
});

router.get('/:user/:year', (req, res) => {
    let user = data.users.findUser(req.params.user);
    let year = user.findYear(req.params.year);
    res.send(year);
});

router.post('/:user/:year', (req, res, next) => {
    let user = data.users.findUser(req.params.user);
    let year = user.findYear(req.params.year);
    year.addMonthlyData(req.body);
    next();
});

router.put('/:user/:year', (req, res, next) => {
    let user = data.users.findUser(req.params.user);
    let year = user.findYear(req.params.year);
    year.modify({
        year: req.params.year,
        ...req.body
    });
    next();
});

router.delete('/:user/:year', (req, res, next) => {
    let user = data.users.findUser(req.params.user);
    user.delete(req.params.year);
    next();
});

router.get('/:user/:year/:month', (req, res) => {
    let user = data.users.findUser(req.params.user);
    if (user === undefined)
        return res.status(404).send({
            msg: `User ${req.params.user} not found`
        });
    let year = user.findYear(req.params.year);
    if (year === undefined)
        return res.status(404).send({
            msg: `Year ${req.params.year} for user ${req.params.user} not found`
        });
    let month = year.findMonth(req.params.month);
    if (month === undefined)
        return res.status(404).send({
            msg: `Month ${req.params.month} for year ${req.params.year} and user ${req.params.user} not found`
        });
    res.send(month);
});

router.post('/:user/:year/:month', (req, res, next) => {
    let user = data.users.findUser(req.params.user);
    let year = user.findYear(req.params.year);
    req.body.month = req.params.month;
    year.addMonthlyData(req.body);
    next();
});

router.put('/:user/:year/:month', (req, res, next) => {
    let user = data.users.findUser(req.params.user);
    let year = user.findYear(req.params.year);
    let month = year.findMonth(req.params.month);
    req.body.month = req.params.month;
    month.modify(req.body);
    next();
});

router.delete('/:user/:year/:month', (req, res, next) => {
    let user = data.users.findUser(req.params.user);
    let year = user.findYear(req.params.year);
    year.delete(req.params.month);
    next();
});

router.use((req, res) => {
    data.users.save();
    res.send(data.users.data);
});

module.exports = router;