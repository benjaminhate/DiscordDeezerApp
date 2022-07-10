const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

function getMonthFromNumber(number){
    checkMonthNumber(number);
    return monthNames[number - 1];
}

function getMonthFromName(name){
    let index = monthNames.indexOf(name);
    if (index == -1){
        throw new Error(`Name ${name} is not a valid month name.`);
    }
    return index + 1;
}

function getPreviousMonth(nameOrNumber){
    if(typeof nameOrNumber == 'string'){
        nameOrNumber = getMonthFromName(nameOrNumber);
    }
    let previousNumber = nameOrNumber == 1 ? 12 : nameOrNumber - 1;
    return getMonthFromNumber(previousNumber);
}

function checkMonthNumber(number){
    if(number < 1 || number > 12) {
        throw new Error(`Number cannot be smaller than 1 or greater than 12 : ${number}`);
    }
}