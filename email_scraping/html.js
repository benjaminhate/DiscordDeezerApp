const { JSDOM } = require("jsdom");
const { XPathResult } = require('xpath');
const { detectLanguage, $t, monthNumber } = require('./languages');
const { months, strings } = require('../common');
const deezerMonthlyData = require('../data/deezerMonthlyData');
const deezerTopSong = require('../data/deezerTopSong');

exports.scrap = function(htmlString){
    const { document } = (new JSDOM(htmlString)).window;

    const beginText = document.body.firstElementChild.textContent.trim();
    const language = detectLanguage('Begin', beginText);

    return new deezerMonthlyData(
        getMonthFromDOM(document, language),
        getSongsFromDOM(document, language),
        getMinutesFromDOM(document, language),
        getSongsPerDayFromDOM(document, language),
        getTopArtistFromDOM(document, language),
        getTopSongsFromDOM(document, language)
    );
}

function getMonthFromDOM(document, language){
    let matchingElement = getElementFromText(document, 'td', $t('Title', language));
    let element = matchingElement.parentElement.nextElementSibling.firstElementChild;

    let month = element.textContent.trim().substring(7);
    let number = monthNumber(month, language);
    return months.getMonthName(number);
}

function getSongsFromDOM(document, language){
    let matchingElement = getElementFromText(document, 'p', $t('Songs', language));
    let element = matchingElement.nextElementSibling;

    return parseInt(element.textContent.trim());
}

function getMinutesFromDOM(document, language){
    let matchingElement = getElementFromText(document, 'p', $t('Minutes', language));
    let element = matchingElement.nextElementSibling;

    return parseInt(element.textContent.trim());
}

function getSongsPerDayFromDOM(document, language){
    let matchingElement = getElementFromText(document, 'p', $t('SongsPerDay', language));
    let element = matchingElement.nextElementSibling;

    return parseInt(element.textContent.trim());
}

function getTopArtistFromDOM(document, language){
    let matchingElement = getElementFromText(document, 'td', $t('TopArtist', language));
    let element = matchingElement.parentElement.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild;

    return strings.clean(element.textContent);
}

function getTopSongsFromDOM(document, language){
    let firstMatchingElement = getElementFromText(document, 'td', $t('TopSong', language));
    let firstElement = firstMatchingElement.parentElement.nextElementSibling;

    let secondMatchingElement = getElementFromText(document, 'td', $t('OtherTopSongs', language));
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