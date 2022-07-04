module.exports = class deezerTopSong{
    constructor(name = '', artist = ''){
        this.name = name;
        this.artist = artist;
    }

    static fromString(str){
        if(!str.includes('-')){
            throw new Error(`Song '${str}' does not contain '-' character.`);
        }
        const [song, ...artistParts] = str.split('-');
        const artist = artistParts.join('-');
        return new deezerTopSong(song.trim(), artist.trim());
    }

    static fromJson(json){
        if(typeof json == 'string'){
            return deezerTopSong.fromString(json);
        }
        let name = json['name'];
        let artist = json['artist'];
        return new deezerTopSong(name, artist);
    }

    modify(topSongData){
        if(typeof topSongData == 'string'){
            let song = deezerTopSong.fromString(topSongData);
            this.name = song.name;
            this.artist = song.artist;
        }else{
            if(topSongData.name !== undefined)
                this.name = topSongData.name;
            if(topSongData.artist !== undefined)
                this.artist = topSongData.artist;
        }
    }

    toString(){
        return `${this.name} - ${this.artist}`;
    }
}