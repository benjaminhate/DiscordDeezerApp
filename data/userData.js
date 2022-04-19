const deezerYearlyData = require('./deezerYearlyData.js');

module.exports = class userData {
    constructor(){
        this('');
    }

    constructor(name){
        this(name, []);
    }

    constructor(name, deezerData){
        this.name = name;
        this.deezerData = deezerData
    }
}