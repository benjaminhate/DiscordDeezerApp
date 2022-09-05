const comparePreviousMonthUsernameInput = document.getElementById("usernameComparePreviousMonth");
const comparePreviousMonthYearInput = document.getElementById("yearComparePreviousMonth");
const comparePreviousMonthMonthDropdown = document.getElementById("monthComparePreviousMonth");

const comparePreviousMonthLoader = document.getElementById("comparePreviousMonthLoader");

const comparePreviousMonthContent = document.getElementById("comparePreviousMonthContent");
const comparePreviousMonthTextarea = document.getElementById("comparePreviousMonthTextarea");

async function comparePreviousMonth(){
    if(!comparePreviousMonthCheckInputs()){
        alert("Error with inputs");
        return;
    }
    
    hideElement(comparePreviousMonthContent);

    let username = comparePreviousMonthUsernameInput.value;
    let year = comparePreviousMonthYearInput.value;
    let month = months.getMonthNameFromNumber(comparePreviousMonthMonthDropdown.value);

    showElement(comparePreviousMonthLoader);

    let json = await getCompareMessageFromPreviousMonth(username, year, month);

    hideElement(comparePreviousMonthLoader);

    if(json.success){
        showElement(comparePreviousMonthContent);
        comparePreviousMonthTextarea.textContent = json.result.msg;
    }else{
        alert(`Error : ${json.result.msg}`);
    }
}

function comparePreviousMonthCheckInputs(){
    return compareBaseCheckInputs();
}

function compareBaseCheckInputs(){
    if(comparePreviousMonthUsernameInput === undefined 
        || comparePreviousMonthYearInput === undefined
        || comparePreviousMonthMonthDropdown === undefined)
        return false;
    
    if(!comparePreviousMonthUsernameInput.value
        || !comparePreviousMonthYearInput.value
        || !comparePreviousMonthMonthDropdown.value)
        return false;

    return true;
}