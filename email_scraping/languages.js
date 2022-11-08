const { capitalize } = require("../common/strings");

const t = {
    'fr': {
        'Begin': 'Découvrez les titres que vous écoutez le plus',
        'Title': 'Votre mois en musique',
        'Songs': 'Titres',
        'Minutes': 'Nombre de minutes',
        'SongsPerDay': 'Nombre moyen de titres par jour',
        'TopArtist': 'Votre artiste préféré',
        'TopSong': 'Votre titre préféré',
        'OtherTopSongs': 'Vos autres titres préférés',
        'Months': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    },
    'en': {
        'Begin': 'Check out your most-listened tracks and more',
        'Title': 'Your month in music',
        'Songs': 'Tracks',
        'Minutes': 'Minutes listened',
        'SongsPerDay': 'Average tracks per day',
        'TopArtist': 'Your top artist',
        'TopSong': 'Your top track',
        'OtherTopSongs': 'Your other top tracks',
        'Months': ['January', 'February', 'March', 'April', 'Mai', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
}

exports.detectLanguage = function (propertyName, value) {
    for (let lang in t) {
        let val = t[lang][propertyName];
        if (val && val === value) return lang;
    }
}

exports.$t = function (propertyName, lang) {
    return t[lang][propertyName];
}

exports.monthNumber = function (month, lang){
    const months = t[lang].Months;
    return months.indexOf(capitalize(month)) + 1;
}