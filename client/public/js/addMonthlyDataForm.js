const addMonthlyDataModal = document.getElementById("addMonthlyDataModal");

const addMonthlyDataUsernameInput = document.getElementById("addMonthlyDataUsername");
const addMonthlyDataYearInput = document.getElementById("addMonthlyDataYear");
const addMonthlyDataMonthDropdown = document.getElementById("addMonthlyDataMonth");

const addMonthlyDataEmailInput = document.getElementById("addMonthlyDataEmail");

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
    let month = common.months.getMonthNameFromNumber(addMonthlyDataMonthDropdown.value);
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
        || !addMonthlyDataSongsInput.valueAsNumber
        || !addMonthlyDataMinutesInput.valueAsNumber
        || !addMonthlyDataSongsPerDayInput.valueAsNumber
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
        songs: addMonthlyDataSongsInput.valueAsNumber,
        minutes: addMonthlyDataMinutesInput.valueAsNumber,
        songsPerDay: addMonthlyDataSongsPerDayInput.valueAsNumber,
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

async function getMonthlyDataFromEmail(){
    if(addMonthlyDataEmailInput === undefined ||
        addMonthlyDataEmailInput.files.length !== 1){
            alert("Error with inputs");
            return
        }

    let emailData = addMonthlyDataEmailInput.files[0];

    showElement(addMonthlyDataLoader);

    let json = await getDataFromEmail(emailData);

    hideElement(addMonthlyDataLoader);

    if(json.success){
        fillModalAddMonthlyData(json.result);
    }else{
        alert(`Error : ${json.result.msg}`);
    }
}

function fillModalAddMonthlyData(data){
    addMonthlyDataMonthDropdown.value = common.months.getMonthNumberFromName(data.month);
    addMonthlyDataSongsInput.valueAsNumber = data.songs;
    addMonthlyDataMinutesInput.valueAsNumber = data.minutes;
    addMonthlyDataSongsPerDayInput.valueAsNumber = data.songsPerDay;
    addMonthlyDataTopArtistInput.value = data.topArtist;
    addMonthlyDataTopSong1NameInput.value = data.topSongs[0].name;
    addMonthlyDataTopSong1ArtistInput.value = data.topSongs[0].artist;
    addMonthlyDataTopSong2NameInput.value = data.topSongs[1].name;
    addMonthlyDataTopSong2ArtistInput.value = data.topSongs[1].artist;
    addMonthlyDataTopSong3NameInput.value = data.topSongs[2].name;
    addMonthlyDataTopSong3ArtistInput.value = data.topSongs[2].artist;
}