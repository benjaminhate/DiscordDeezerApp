module.exports = class deezerMonthlyData{
    constructor(){
        this(0, 0, 0, '', ['', '', '']);
    }

    constructor(songs, minutes, songPerDay, topArtist, topSongs){
        this.songs = songs;
        this.minutes = minutes;
        this.songPerDay = songPerDay;
        this.topArtist = topArtist;
        this.topSongs = topSongs;
    }
}