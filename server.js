require('dotenv/config');
const express = require('express');

const app = express();
const port = process.env.PORT;

const logger = require('./logger.js');
const apiRoutes = require('./api').routes;

app.use(logger);

app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});