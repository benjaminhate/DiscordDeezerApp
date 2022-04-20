const { months } = require('../common');
const deezerTopSong = require('./deezerTopSong.js');

module.exports = class deezerMonthlyData{
    constructor(month, songs = 0, minutes = 0, songsPerDay = 0, topArtist = '',
        topSongs = [new deezerTopSong(), new deezerTopSong(), new deezerTopSong()]){
        this.month = months.getMonthName(month);
        this.songs = songs;
        this.minutes = minutes;
        this.songsPerDay = songsPerDay;
        this.topArtist = topArtist;
        this.topSongs = topSongs;
    }

    static fromJson(json){
        let month = json['month'];
        let songs = json['songs'];
        let minutes = json['minutes'];
        let songsPerDay = json['songsPerDay'];
        let topArtist = json['topArtist'];
        let topSongs = [];
        for(let s of json['topSongs']){
            topSongs.push(deezerTopSong.fromJson(s));
        }
        return new deezerMonthlyData(month, songs, minutes, songsPerDay, topArtist, topSongs);
    }

    modify(monthlyData){
        if(monthlyData.month !== undefined)
            this.month = monthlyData.month;
        if(monthlyData.songs !== undefined)
            this.songs = monthlyData.songs;
        if(monthlyData.minutes !== undefined)
            this.minutes = monthlyData.minutes;
        if(monthlyData.songsPerDay !== undefined)
            this.songsPerDay = monthlyData.songsPerDay;
        if(monthlyData.topArtist !== undefined)
            this.topArtist = monthlyData.topArtist;
        if(monthlyData.topSongs !== undefined){
            for(let i = 0; i < this.topSongs.length; i++){
                if(monthlyData.topSongs[i] !== undefined)
                    this.topSongs[i].modify(monthlyData.topSongs[i]);
            }
        }
    }
}