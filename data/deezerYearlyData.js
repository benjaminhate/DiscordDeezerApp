const deezerMonthlyData = require('./deezerMonthlyData.js');

module.exports = class deezerYearlyData{
    constructor(){
        this([]);
    }

    constructor(monthsData){
        this.monthsData = monthsData;
    }
}