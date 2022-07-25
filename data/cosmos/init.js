const { CosmosClient } = require('@azure/cosmos');

const client = new CosmosClient({
    endpoint: process.env.COSMOS_URL,
    key: process.env.COSMOS_KEY
});

const database = client.database(process.env.COSMOS_DATABASE);

exports.client = client;
exports.database = database;