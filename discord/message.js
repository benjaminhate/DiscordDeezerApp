function strokeFirst(oldStr, newStr){
    return `~~${oldStr}~~ ${newStr}`;
}

function compareMonthsMessage(deezerMonth1, deezerMonth2){
    return monthlyMessage(
        strokeFirst(deezerMonth1.month, deezerMonth2.month),
        strokeFirst(deezerMonth1.songs, deezerMonth2.songs),
        strokeFirst(deezerMonth1.minutes, deezerMonth2.minutes),
        strokeFirst(deezerMonth1.songsPerDay, deezerMonth2.songsPerDay),
        strokeFirst(deezerMonth1.topArtist, deezerMonth2.topArtist),
        deezerMonth2.topSongs[0].toString(),
        deezerMonth2.topSongs[1].toString(),
        deezerMonth2.topSongs[2].toString()
    );
}

function monthlyMessage(month, songs, minutes, songsPerDay, topArtist, topSong1, topSong2, topSong3){
    return `Mon mois de ${month} :
    - ${songs} chansons
    - ${minutes} minutes
    - ${songsPerDay} chansons/jour en moyenne
    - Top artiste : ${topArtist}
    - Top chansons :
        1 - ${topSong1}
        2 - ${topSong2}
        3 - ${topSong3}`;
}

exports.generateMonthlyMessage = function(deezerMonthly){
    return monthlyMessage(
        deezerMonthly.month,
        deezerMonthly.songs,
        deezerMonthly.minutes,
        deezerMonthly.songsPerDay,
        deezerMonthly.topArtist,
        deezerMonthly.topSongs[0],
        deezerMonthly.topSongs[1],
        deezerMonthly.topSongs[2]
    );
};

exports.generateCompareMonthlyMessage = compareMonthsMessage;