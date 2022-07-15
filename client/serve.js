const express = require('express');
const path = require('path');
const hbs = require('hbs');

const common = require('../common');

const router = express.Router();

hbs.registerPartials(path.join(__dirname, 'views/partials'));

router.use('/', express.static(path.join(__dirname, '/public')));
router.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));
router.use('/common', express.static(path.join(__dirname, '../common')));

router.get('/', (req, res) => {
    res.render('index', {
        subject: 'Test',
        months: common.months.months
    });
});

module.exports = router;