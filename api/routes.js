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
})

module.exports = router;