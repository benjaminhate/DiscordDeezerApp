const addMonthlyDataModal = document.getElementById("addMonthlyDataModal");

const addMonthlyDataUsernameInput = document.getElementById("addMonthlyDataUsername");
const addMonthlyDataYearInput = document.getElementById("addMonthlyDataYear");
const addMonthlyDataMonthDropdown = document.getElementById("addMonthlyDataMonth");

const addMonthlyDataSongsInput = document.getElementById("addMonthlyDataSongs");
const addMonthlyDataMinutesInput = document.getElementById("addMonthlyDataMinutes");
const addMonthlyDataSongsPerDayInput = document.getElementById("addMonthlyDataSongsPerDay");
const addMonthlyDataTopArtistInput = document.getElementById("addMonthlyDataTopArtist");

const addMonthlyDataTopSong1NameInput = document.getElementById("addMonthlyDataTopSong1Name");
const addMonthlyDataTopSong1ArtistInput = document.getElementById("addMonthlyDataTopSong1Artist");
const addMonthlyDataTopSong2NameInput = document.getElementById("addMonthlyDataTopSong2Name");
const addMonthlyDataTopSong2ArtistInput = document.getElementById("addMonthlyDataTopSong2Artist");
const addMonthlyDataTopSong3NameInput = document.getElementById("addMonthlyDataTopSong3Name");
const addMonthlyDataTopSong3ArtistInput = document.getElementById("addMonthlyDataTopSong3Artist");

const addMonthlyDataLoader = document.getElementById("addMonthlyDataLoader");

async function sendMonthlyData(){
    if(!addMonthlyDataCheckInputs()){
        alert("Error with inputs");
        return;
    }

    let username = addMonthlyDataUsernameInput.value;
    let year = addMonthlyDataYearInput.value;
    let month = months.getMonthNameFromNumber(addMonthlyDataMonthDropdown.value);
    let data = addMonthlyDataGenerateData();

    showElement(addMonthlyDataLoader);

    let json = await postMonthlyData(username, year, month, data);

    hideElement(addMonthlyDataLoader);

    if(json.success){
        let modal = bootstrap.Modal.getInstance(addMonthlyDataModal)
        modal.hide();
    }else{
        alert(`Error : ${json.result.msg}`);
    }
}

function addMonthlyDataCheckInputs(){
    if(addMonthlyDataUsernameInput === undefined 
        || addMonthlyDataYearInput === undefined
        || addMonthlyDataMonthDropdown === undefined
        || addMonthlyDataSongsInput === undefined
        || addMonthlyDataMinutesInput === undefined
        || addMonthlyDataSongsPerDayInput === undefined
        || addMonthlyDataTopArtistInput === undefined
        || addMonthlyDataTopSong1NameInput === undefined
        || addMonthlyDataTopSong1ArtistInput === undefined
        || addMonthlyDataTopSong2NameInput === undefined
        || addMonthlyDataTopSong2ArtistInput === undefined
        || addMonthlyDataTopSong3NameInput === undefined
        || addMonthlyDataTopSong3ArtistInput === undefined)
        return false;
    
    if(!addMonthlyDataUsernameInput.value
        || !addMonthlyDataYearInput.value
        || !addMonthlyDataMonthDropdown.value
        || !addMonthlyDataSongsInput.value
        || !addMonthlyDataMinutesInput.value
        || !addMonthlyDataSongsPerDayInput.value
        || !addMonthlyDataTopArtistInput.value
        || !addMonthlyDataTopSong1NameInput.value
        || !addMonthlyDataTopSong1ArtistInput.value
        || !addMonthlyDataTopSong2NameInput.value
        || !addMonthlyDataTopSong2ArtistInput.value
        || !addMonthlyDataTopSong3NameInput.value
        || !addMonthlyDataTopSong3ArtistInput.value)
        return false;

    return true;
}

function addMonthlyDataGenerateData(){
    return {
        songs: addMonthlyDataSongsInput.value,
        minutes: addMonthlyDataMinutesInput.value,
        songsPerDay: addMonthlyDataSongsPerDayInput.value,
        topArtist: addMonthlyDataTopArtistInput.value,
        topSongs: [
            {
                name: addMonthlyDataTopSong1NameInput.value,
                artist: addMonthlyDataTopSong1ArtistInput.value
            },
            {
                name: addMonthlyDataTopSong2NameInput.value,
                artist: addMonthlyDataTopSong2ArtistInput.value
            },
            {
                name: addMonthlyDataTopSong3NameInput.value,
                artist: addMonthlyDataTopSong3ArtistInput.value
            }
        ]
    };
}