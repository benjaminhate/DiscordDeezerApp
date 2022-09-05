const deezerMonthlyData = require('./deezerMonthlyData.js');

module.exports = class deezerYearlyData{
    constructor(year, ...monthsData){
        this.year = year;
        this.monthsData = monthsData;
    }

    static fromJson(json){
        let year = json['year'];
        let monthsData = [];
        for(let m of json['monthsData']){
            monthsData.push(deezerMonthlyData.fromJson(m));
        }
        return new deezerYearlyData(year, ...monthsData);
    }

    static fromCosmos(year, cosmosItems){
        let monthsData = [];
        for(let cosmosItem of cosmosItems){
            monthsData.push(deezerMonthlyData.fromJson(cosmosItem))
        }
        return new deezerYearlyData(year, ...monthsData);
    }

    findMonth(month){
        return this.monthsData.find(m => m.month == month);
    }

    addMonthlyData(...monthlyData){
        for(let md of monthlyData){
            let monthData = deezerMonthlyData.fromJson(md);
            if(this.monthsData.findIndex(m => m.month == monthData.month) != -1){
                console.error(`Year ${this.year} already has data for month ${monthData.month}`);
                return;
            }
            this.monthsData.push(monthData);
        }
    }

    modify(yearlyData){
        if(yearlyData.year !== undefined)
            this.year = yearlyData.year;
        if(yearlyData.monthsData !== undefined){
            for(let md of yearlyData.monthsData){
                let monthData = deezerMonthlyData.fromJson(md);
                let month = this.monthsData.find(m => m.month == monthData.month);
                if(month === undefined){
                    this.monthsData.push(monthData);
                }else{
                    month.modify(monthData);
                }
            }
        }
    }

    delete(month){
        let index = this.monthsData.findIndex(m => m.month == month);
        if(index == -1){
            console.error(`Year ${this.year} does not have data for month ${month}`);
        }else{
            this.monthsData.splice(index, 1);
        }
    }
}