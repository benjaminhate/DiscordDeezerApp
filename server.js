require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;

const logger = require('./logger.js');
const apiRoutes = require('./api').routes;
const clientServe = require('./client').serve;

app.use(bodyParser.json());
app.use(logger);

app.use('/api', apiRoutes);

app.set('views', './client/views');
app.set('view engine', 'hbs');
app.use('/client', clientServe);

app.use('/', (req, res) => {
    res.redirect('/client');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});