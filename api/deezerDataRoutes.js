const express = require('express');
const data = require('../data');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(data.users.getUsers());
});

router.post('/', (req, res, next) => {
    data.users.createUsers(req.body);
    next();
});

router.get('/:user', (req, res) => {
    res.send(data.users.findUser(req.params.user));
});

router.post('/:user', (req, res, next) => {
    data.users.addUserYearlyData(req.params.user, req.body);
    next();
});

router.put('/:user', (req, res, next) => {
    data.users.modifyUser(req.params.user, req.body);
    next();
});

router.delete('/:user', (req, res, next) => {
    data.users.deleteUser(req.params.user);
    next();
});

router.get('/:user/:year', (req, res) => {
    res.send(data.users.findUserYear(req.params.user, req.params.year));
});

router.post('/:user/:year', (req, res, next) => {
    data.users.addUserMonthlyData(req.params.user, req.params.year, req.body);
    next();
});

router.put('/:user/:year', (req, res, next) => {
    data.users.modifyUserYear(req.params.user, req.params.year, req.body);
    next();
});

router.delete('/:user/:year', (req, res, next) => {
    data.users.deleteUserYear(req.params.user, req.params.year);
    next();
});

router.get('/:user/:year/:month', (req, res) => {
    try{
        res.send(data.users.findUserMonth(req.params.user, req.params.year, req.params.month));
    }catch(e){
        return res.status(404).send({
            msg: e.message
        });
    }
    
});

router.post('/:user/:year/:month', (req, res, next) => {
    let monthData = {
        month: req.params.month,
        ...req.body
    };
    data.users.addUserMonthlyData(req.params.user, req.params.year, monthData);
    next();
});

router.put('/:user/:year/:month', (req, res, next) => {
    data.users.modifyUserMonth(req.params.user, req.params.year, req.params.month, req.body);
    next();
});

router.delete('/:user/:year/:month', (req, res, next) => {
    data.users.deleteUserMonth(req.params.user, req.params.year, req.params.month);
    next();
});

router.use((req, res) => {
    res.send(data.users.getUsers());
});

module.exports = router;