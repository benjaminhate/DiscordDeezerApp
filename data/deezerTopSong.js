module.exports = class deezerTopSong{
    constructor(name = '', artist = ''){
        this.name = name;
        this.artist = artist;
    }

    static fromString(str){
        if(!str.includes('-')){
            throw new Error(`Song '${str}' does not contain '-' character.`);
        }
        const parts = str.split('-');
        return new deezerTopSong(parts[0].trim(), parts[1].trim());
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