const usernameInput = document.getElementById("usernameMonthlyData");
const yearInput = document.getElementById("yearMonthlyData");
const monthDropdown = document.querySelector("#monthMonthlyData > #monthsDropdown");
const loader = document.getElementById("monthlyDataLoader");
const content = document.getElementById("monthlyDataContent");

async function searchMonthlyData(){
    if(!checkInputs()){
        alert("Error with inputs");
        return;
    }
    let username = usernameInput.value;
    let year = yearInput.value;
    let month = getMonthFromNumber(monthDropdown.value);

    showElement(loader);
    hideElement(content);

    let json = await getMonthlyData(username, year, month);

    hideElement(loader);

    if(json.success){
        fillMonthlyData(json.result);
    }else{
        alert(`Error : ${json.result.msg}`);
    }
}

function checkInputs(){
    if(usernameInput === undefined 
        || yearInput === undefined
        || monthDropdown === undefined)
        return false;
    
    if(!usernameInput.value
        || !yearInput.value
        || !monthDropdown.value)
        return false;

    return true;
}

function fillMonthlyData(data){
    content.textContent = JSON.stringify(data);
    showElement(content);
}