const capitalize = function (str){
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const clean = function (str){
    str = str.trim();
    str = removeLineBreaks(str);
    str = removeTabulations(str);
    return str;
}

const removeLineBreaks = function (str){
    return str.replace(/(\r\n|\n|\r)/gm, "");
}

const removeTabulations = function (str){
    return str.replace(/(\t)/gm, "");
}

exports.capitalize = capitalize;
exports.removeLineBreaks = removeLineBreaks;
exports.removeTabulations = removeTabulations;
exports.clean = clean;