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

exports.data = users;

exports.fromJson = fromJson;

exports.findUser = function(userName){
    return users.find(u => u.name == userName);
}

exports.deleteUser = function(userName){
    let index = users.findIndex(u => u.name == userName);
    if(index == -1){
        console.error(`User ${userName} doesn't exist`);
    }else{
        users.splice(index, 1);
    }
}

exports.save = function(){
    fs.writeFileSync(filename, JSON.stringify(users, null, 2), { encoding: 'utf-8'});
}