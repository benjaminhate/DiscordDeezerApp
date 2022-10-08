const { JSDOM } = require("jsdom");
const { XPathResult } = require('xpath');
const { months, strings } = require('../common');
const deezerMonthlyData = require('../data/deezerMonthlyData');
const deezerTopSong = require('../data/deezerTopSong');

exports.scrap = function(htmlString){
    const { document } = (new JSDOM(htmlString)).window;

    return new deezerMonthlyData(
        getMonthFromDOM(document),
        getSongsFromDOM(document),
        getMinutesFromDOM(document),
        getSongsPerDayFromDOM(document),
        getTopArtistFromDOM(document),
        getTopSongsFromDOM(document)
    );
}

function getMonthFromDOM(document){
    let matchingElement = getElementFromText(document, 'td', 'Votre mois en musique');
    let element = matchingElement.parentElement.nextElementSibling.firstElementChild;

    let month = element.textContent.trim().substring(7);
    return months.getMonthName(month);
}

function getSongsFromDOM(document){
    let matchingElement = getElementFromText(document, 'p', 'Titres');
    let element = matchingElement.nextElementSibling;

    return parseInt(element.textContent.trim());
}

function getMinutesFromDOM(document){
    let matchingElement = getElementFromText(document, 'p', 'Nombre de minutes');
    let element = matchingElement.nextElementSibling;

    return parseInt(element.textContent.trim());
}

function getSongsPerDayFromDOM(document){
    let matchingElement = getElementFromText(document, 'p', 'Nombre moyen de titres par jour');
    let element = matchingElement.nextElementSibling;

    return parseInt(element.textContent.trim());
}

function getTopArtistFromDOM(document){
    let matchingElement = getElementFromText(document, 'td', 'Votre artiste préféré');
    let element = matchingElement.parentElement.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild;

    return strings.clean(element.textContent);
}

function getTopSongsFromDOM(document){
    let firstMatchingElement = getElementFromText(document, 'td', 'Votre titre préféré');
    let firstElement = firstMatchingElement.parentElement.nextElementSibling;

    let secondMatchingElement = getElementFromText(document, 'td', 'Vos autres titres préférés');
    let secondElement = secondMatchingElement.parentElement.nextElementSibling;
    let thirdElement = secondElement.nextElementSibling.nextElementSibling;

    return [
        getTopSongFromElement(firstElement),
        getTopSongFromElement(secondElement),
        getTopSongFromElement(thirdElement)
    ];
}

function getTopSongFromElement(element){
    let songNameElement = element.firstElementChild;
    let songArtistElement = element.nextElementSibling.firstElementChild;

    return new deezerTopSong(
        strings.clean(songNameElement.textContent),
        strings.clean(songArtistElement.textContent)
    )
}

function getElementFromText(document, nodeName, nodeContent){
    let xpath = `//${nodeName}[contains(text(),'${nodeContent}')]`;
    return document
        .evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue;
}