const _ = require('underscore');
const deezerMonthlyData = require('../deezerMonthlyData.js');
const userData = require('../userData.js');
const { database } = require('./init.js');

const container = database.container("MonthlyData");

async function queryAsync(query, parameters){
    let { resources } = await container.items.query({
        query: query,
        parameters: parameters
    }).fetchAll();
    return resources;
}

async function getMonthlyData(userName, yearValue, monthValue){
    let query = "select * from c where c.username = @username and c.year = @year and c.month = @month"
    let parameters = [
        { name: "@username", value: userName },
        { name: "@year", value: parseInt(yearValue) },
        { name: "@month", value: monthValue }
    ]
    let cosmosItems = await queryAsync(query, parameters);
    if(cosmosItems.length == 0)
        throw new Error(`Month ${monthValue} for year ${yearValue} and user ${userName} not found`);
    return cosmosItems[0];
}

exports.getUsers = async function(){
    let query = "select * from c"
    let cosmosItems = await queryAsync(query);
    let users = [];
    let cosmosItemsUsers = _.groupBy(cosmosItems, c => c.username);
    for(let username in cosmosItemsUsers){
        users.push(userData.fromCosmos(username, cosmosItemsUsers[username]));
    }
    return users;
}

exports.findUser = async function(userName){
    let query = "select * from c where c.username = @username"
    let parameters = [
        { name: "@username", value: userName }
    ]
    let cosmosItems = await queryAsync(query, parameters)
    return userData.fromCosmos(userName, cosmosItems)
}

exports.findUserYear = async function(userName, yearValue){
    let query = "select * from c where c.username = @username and c.year = @year"
    let parameters = [
        { name: "@username", value: userName },
        { name: "@year", value: parseInt(yearValue) }
    ]
    let cosmosItems = await queryAsync(query, parameters);
    return userData.fromCosmos(userName, cosmosItems)
}

exports.findUserMonth = async function(userName, yearValue, monthValue){
    let cosmosItem = await getMonthlyData(userName, yearValue, monthValue);
    return deezerMonthlyData.fromJson(cosmosItem);
}

exports.addUserMonthlyData = async function(userName, yearValue, monthData){
    let body = {
        username: userName,
        year: parseInt(yearValue),
        ...monthData
    };
    try{
        await container.items.create(body);
    }catch(e){
        if(e.code === 409){
            throw new Error(`Year ${yearValue} already has data for month ${monthData.month}`);
        }
    }
}

exports.deleteUserMonth = async function (userName, yearValue, monthValue){
    let cosmosItem = await getMonthlyData(userName, yearValue, monthValue);
    await container.item(cosmosItem.id, cosmosItem.username).delete();
}