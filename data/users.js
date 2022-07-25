const fs = require('fs');
const userData = require('./userData.js');

const filename = './users.json';
const users = [];
init();

function init(){
    let json = JSON.parse(fs.readFileSync(filename, { encoding: 'utf-8' }));
    if(json !== undefined){
        fromJson(json);
    }
}

function fromJson(json){
    clearUsers();
    for(let u of json){
        users.push(userData.fromJson(u));
    }
}

function clearUsers(){
    while(users.length){
        users.pop();
    }
}

function findUser(userName){
    return users.find(u => u.name == userName);
}

function addUser(userName){
    let newUser = new userData(userName);
    users.push(newUser);
    save();
    return newUser;
}

exports.createUsers = function(json){
    let users = fromJson(json);
    save();
    return users;
}

exports.addUser = addUser;

exports.addUserYearlyData = function(userName, yearlyData){
    let user = findUser(userName);
    user.addYearlyData(yearlyData);
    save();
}

exports.addUserMonthlyData = function(userName, yearValue, monthlyData){
    let user = findUser(userName);
    if(user === undefined)
        user = addUser(userName);
    let year = user.findYear(yearValue);
    if(year === undefined)
        year = user.addYear(yearValue);
    year.addMonthlyData(monthlyData);
    save();
}

exports.getUsers = function(){
    return users;
}

exports.findUser = findUser;

exports.findUserYear = function(userName, yearValue){
    let user = findUser(userName);
    let year = user.findYear(yearValue);
    return year;
}

exports.findUserMonth = function(userName, yearValue, monthValue){
    let user = findUser(userName);
    if (user === undefined)
        throw new Error(`User ${userName} not found`); 
    let year = user.findYear(yearValue);
    if (year === undefined)
        throw new Error(`Year ${yearValue} for user ${userName} not found`);
    let month = year.findMonth(monthValue);
    if (month === undefined)
        throw new Error(`Month ${monthValue} for year ${yearValue} and user ${userName} not found`);
    return month;
}

exports.modifyUser = function(userName, userData){
    let user = findUser(userName);
    user.modify(userData);
    save();
}

exports.modifyUserYear = function(userName, yearValue, yearData){
    let user = findUser(userName);
    let year = user.findYear(yearValue);
    year.modify({
        year: yearValue,
        yearData
    });
    save();
}

exports.modifyUserMonth = function(userName, yearValue, monthValue, monthData){
    let user = findUser(userName);
    let year = user.findYear(yearValue);
    let month = year.findMonth(monthValue);
    monthData.month = monthValue;
    month.modify(monthData);
    save();
}

exports.deleteUser = function(userName){
    let index = users.findIndex(u => u.name == userName);
    if(index == -1){
        console.error(`User ${userName} doesn't exist`);
    }else{
        users.splice(index, 1);
    }
    save();
}

exports.deleteUserYear = function(userName, yearValue){
    let user = findUser(userName);
    user.delete(yearValue);
    save();
}

exports.deleteUserMonth = function(userName, yearValue, monthValue){
    let user = findUser(userName);
    let year = user.findYear(yearValue);
    year.delete(monthValue);
    save();
}

function save(){
    fs.writeFileSync(filename, JSON.stringify(users, null, 2), { encoding: 'utf-8'});
}