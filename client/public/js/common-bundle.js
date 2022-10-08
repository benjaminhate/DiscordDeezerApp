(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.common = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./strings":2}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
exports.months = require('./months');
exports.strings = require('./strings');
},{"./months":1,"./strings":2}]},{},[3])(3)
});
