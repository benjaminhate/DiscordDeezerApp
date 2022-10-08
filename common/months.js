const { capitalize } = require('./strings');

const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

const getMonthFromNumber = function (number) {
    if (number < 1 || number > 12) {
        throw new Error(`Number cannot be smaller than 1 or greater than 12 : ${number}`);
    }
    return monthNames[number - 1];
}

const getMonthFromName = function (name) {
    name = capitalize(name.trim());
    if(name === "Fevrier") name = "Février";
    if(name === "Aout") name = "Août";
    if(name === "Decembre") name = "Décembre";
    let index = monthNames.indexOf(name);
    if (index == -1) {
        throw new Error(`Name ${name} is not a valid month name.`);
    }
    return index + 1;
}

const getMonth = function (nameOrNumber) {
    if (typeof nameOrNumber == 'string') {
        nameOrNumber = getMonthFromName(nameOrNumber);
    }
    return getMonthFromNumber(nameOrNumber);
}

const getPreviousMonth = function (nameOrNumber) {
    if (typeof nameOrNumber == 'string') {
        nameOrNumber = getMonthFromName(nameOrNumber);
    }
    let previousNumber = nameOrNumber == 1 ? 12 : nameOrNumber - 1;
    return getMonthFromNumber(previousNumber);
}

exports.getMonthNameFromNumber = getMonthFromNumber;
exports.getMonthNumberFromName = getMonthFromName;
exports.getMonthName = getMonth;
exports.getPreviousMonth = getPreviousMonth;

exports.months = monthNames.map(name => {
    return {
        number: monthNames.indexOf(name) + 1,
        name: name
    };
});