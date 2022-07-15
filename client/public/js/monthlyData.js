const monthlyDataUsernameInput = document.getElementById("usernameMonthlyData");
const monthlyDataYearInput = document.getElementById("yearMonthlyData");
const monthlyDataMonthDropdown = document.getElementById("monthMonthlyData");

const monthlyDataLoader = document.getElementById("monthlyDataLoader");

const monthlyDataContent = document.getElementById("monthlyDataContent");
const monthlyDataContentMonth = document.getElementById("monthlyDataContentMonth");
const monthlyDataContentSongs = document.getElementById("monthlyDataContentSongs");
const monthlyDataContentMinutes = document.getElementById("monthlyDataContentMinutes");
const monthlyDataContentSongsPerDay = document.getElementById("monthlyDataContentSongsPerDay");
const monthlyDataContentTopArtist = document.getElementById("monthlyDataContentTopArtist");
const monthlyDataContentTopSong1 = document.getElementById("monthlyDataContentTopSong1");
const monthlyDataContentTopSong2 = document.getElementById("monthlyDataContentTopSong2");
const monthlyDataContentTopSong3 = document.getElementById("monthlyDataContentTopSong3");

async function searchMonthlyData(){
    if(!monthlyDataCheckInputs()){
        alert("Error with inputs");
        return;
    }
    let username = monthlyDataUsernameInput.value;
    let year = monthlyDataYearInput.value;
    let month = months.getMonthNameFromNumber(monthlyDataMonthDropdown.value);

    showElement(monthlyDataLoader);
    hideElement(monthlyDataContent);

    let json = await getMonthlyData(username, year, month);

    hideElement(monthlyDataLoader);

    if(json.success){
        fillMonthlyData(json.result);
    }else{
        alert(`Error : ${json.result.msg}`);
    }
}

function monthlyDataCheckInputs(){
    if(monthlyDataUsernameInput === undefined 
        || monthlyDataYearInput === undefined
        || monthlyDataMonthDropdown === undefined)
        return false;
    
    if(!monthlyDataUsernameInput.value
        || !monthlyDataYearInput.value
        || !monthlyDataMonthDropdown.value)
        return false;

    return true;
}

function fillMonthlyData(data){
    monthlyDataContentMonth.textContent = data.month;
    monthlyDataContentSongs.textContent = data.songs;
    monthlyDataContentMinutes.textContent = data.minutes;
    monthlyDataContentSongsPerDay.textContent = data.songsPerDay;
    monthlyDataContentTopArtist.textContent = data.topArtist;
    monthlyDataContentTopSong1.textContent = topSongText(data.topSongs[0]);
    monthlyDataContentTopSong2.textContent = topSongText(data.topSongs[1]);
    monthlyDataContentTopSong3.textContent = topSongText(data.topSongs[2]);

    showElement(monthlyDataContent);
}

function topSongText(topSong){
    return `"${topSong.name}" par ${topSong.artist}`;
}