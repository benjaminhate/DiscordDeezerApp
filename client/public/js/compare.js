const compareUsernameInput = document.getElementById("usernameCompare");
const compareYearInput = document.getElementById("yearCompare");
const compareMonthDropdown = document.getElementById("monthCompare");

const compareLoader = document.getElementById("compareLoader");

const compareContent = document.getElementById("compareContent");
const compareTextarea = document.getElementById("compareTextarea");

async function comparePreviousMonth(){
    if(!comparePreviousMonthCheckInputs()){
        alert("Error with inputs");
        return;
    }
    
    hideElement(compareContent);

    let username = compareUsernameInput.value;
    let year = compareYearInput.value;
    let month = months.getMonthNameFromNumber(compareMonthDropdown.value);

    showElement(compareLoader);

    let json = await getCompareMessageFromPreviousMonth(username, year, month);

    hideElement(compareLoader);

    if(json.success){
        showElement(compareContent);
        compareTextarea.textContent = json.result.msg;
    }else{
        alert(`Error : ${json.result.msg}`);
    }
}

function comparePreviousMonthCheckInputs(){
    return compareBaseCheckInputs();
}

function compareBaseCheckInputs(){
    if(compareUsernameInput === undefined 
        || compareYearInput === undefined
        || compareMonthDropdown === undefined)
        return false;
    
    if(!compareUsernameInput.value
        || !compareYearInput.value
        || !compareMonthDropdown.value)
        return false;

    return true;
}