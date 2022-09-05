const express = require('express');
const data = require('../data');

const router = express.Router();

router.get('/', (req, res, next) => {
    next();
});

router.post('/', (req, res, next) => {
    res.status(404).send();
    // data.users.createUsers(req.body);
    // next();
});

router.get('/:user', async (req, res) => {
    // res.status(404).send();
    res.send(await data.cosmos.users.findUser(req.params.user));
});

router.post('/:user', (req, res, next) => {
    res.status(404).send();
    // data.users.addUserYearlyData(req.params.user, req.body);
    // next();
});

router.put('/:user', (req, res, next) => {
    res.status(404).send();
    // data.users.modifyUser(req.params.user, req.body);
    // next();
});

router.delete('/:user', (req, res, next) => {
    res.status(404).send();
    // data.users.deleteUser(req.params.user);
    // next();
});

router.get('/:user/:year', async (req, res) => {
    // res.status(404).send();
    res.send(await data.cosmos.users.findUserYear(req.params.user, req.params.year));
});

router.post('/:user/:year', (req, res, next) => {
    res.status(404).send();
    // data.users.addUserMonthlyData(req.params.user, req.params.year, req.body);
    // next();
});

router.put('/:user/:year', (req, res, next) => {
    res.status(404).send();
    // data.users.modifyUserYear(req.params.user, req.params.year, req.body);
    // next();
});

router.delete('/:user/:year', (req, res, next) => {
    res.status(404).send();
    // data.users.deleteUserYear(req.params.user, req.params.year);
    // next();
});

router.get('/:user/:year/:month', async (req, res) => {
    try{
        res.send(await data.cosmos.users.findUserMonth(req.params.user, req.params.year, req.params.month));
        // res.send(data.users.findUserMonth(req.params.user, req.params.year, req.params.month));
    }catch(e){
        return res.status(404).send({
            msg: e.message
        });
    }
    
});

router.post('/:user/:year/:month', async (req, res, next) => {
    let monthData = {
        month: req.params.month,
        ...req.body
    };
    await data.cosmos.users.addUserMonthlyData(req.params.user, req.params.year, monthData);
    // data.users.addUserMonthlyData(req.params.user, req.params.year, monthData);
    next();
});

router.put('/:user/:year/:month', (req, res, next) => {
    res.status(404).send();
    // data.users.modifyUserMonth(req.params.user, req.params.year, req.params.month, req.body);
    // next();
});

router.delete('/:user/:year/:month', async (req, res, next) => {
    await data.cosmos.users.deleteUserMonth(req.params.user, req.params.year, req.params.month);
    next();
});

router.use(async (req, res) => {
    res.send(await data.cosmos.users.getUsers());
    // res.send(data.users.getUsers());
});

module.exports = router;