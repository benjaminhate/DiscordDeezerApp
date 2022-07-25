const deezerYearlyData = require('./deezerYearlyData.js');

module.exports = class userData {
    constructor(name = '', ...deezerData){
        this.name = name;
        this.deezerData = deezerData
    }

    static fromJson(json){
        let name = json['name'];
        let deezerData = [];
        for(let d of json['deezerData']){
            deezerData.push(deezerYearlyData.fromJson(d));
        }
        return new userData(name, ...deezerData);
    }

    static fromCosmos(cosmosItem){
        let name = cosmosItem.username;
        let deezerData = [
            deezerYearlyData.fromCosmos(cosmosItem)
        ];
        return new userData(name, ...deezerData);
    }

    addYearlyData(...yearlyData){
        for(let yd of yearlyData){
            let yearData = deezerYearlyData.fromJson(yd);
            if(this.deezerData.findIndex(y => y.year == yearData.year) != -1){
                console.error(`User ${this.name} already has data for year ${yearData.year}`);
                return;
            }
            this.deezerData.push(yearData);
        }
    }

    addYear(year){
        let newYear = new deezerYearlyData(year);
        this.deezerData.push(newYear);
        return newYear;
    }

    findYear(year){
        return this.deezerData.find(y => y.year == year);
    }

    delete(year){
        let index = this.deezerData.findIndex(y => y.year == year);
        if(index == -1){
            console.error(`User ${this.name} does not have data for year ${year}`);
        }else{
            this.deezerData.splice(index, 1);
        }
    }
}