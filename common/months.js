const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

const monthFromNumber = function (number){
    if(number < 1 || number > 12) {
        throw new Error(`Number cannot be smaller than 1 or greater than 12 : ${number}`);
    }
    return monthNames[number - 1];
}

const monthFromName = function (name){
    let index = monthNames.indexOf(name);
    if (index == -1){
        throw new Error(`Name ${name} is not a valid month name.`);
    }
    return index + 1;
}

const month = function (nameOrNumber){
    if(typeof nameOrNumber == 'string'){
        nameOrNumber = monthFromName(nameOrNumber);
    }
    return monthFromNumber(nameOrNumber);
}

exports.getMonthNameFromNumber = monthFromNumber;
exports.getMonthNumberFromName = monthFromName;
exports.getMonthName = month;

exports.months = monthNames.map(name => {
    return {
        number: this.getMonthNumberFromName(name),
        name: name
    };
});