const compareChartsUsername1Input = document.getElementById("usernameCharts1");
const compareChartsUsername2Input = document.getElementById("usernameCharts2");
const compareChartsUsername3Input = document.getElementById("usernameCharts3");
const compareChartsAxisSelect = document.getElementById("compareChartsAxisSelect");

const compareChartsLoader = document.getElementById("compareChartsLoader");
const compareChartsContent = document.getElementById("compareChartsContent");

const config = {
    type: 'line',
    options: {
        parsing: {
            xAxisKey: 'id'
        },
        interaction: {
            intersect: false,
            mode: 'index',
        }
    }
};
const compareChart = new Chart(
    compareChartsContent,
    config
);

async function compareChartsLoad(){
    if(!compareChartsCheckInputs()){
        alert("Error with inputs");
        return;
    }
    
    hideElement(compareChartsContent);

    let username1 = compareChartsUsername1Input.value;
    let username2 = compareChartsUsername2Input.value;
    let username3 = compareChartsUsername3Input.value;

    showElement(compareChartsLoader);

    let jsons = [];

    if(username1){
        let json = await getUserData(username1);
        if(json.success){
            jsons.push(json.result)
        }else{
            alert(`Error : ${json.result.msg}`);
        }
    }
    if(username2){
        let json = await getUserData(username2);
        if(json.success){
            jsons.push(json.result)
        }else{
            alert(`Error : ${json.result.msg}`);
        }
    }
    if(username3){
        let json = await getUserData(username3);
        if(json.success){
            jsons.push(json.result)
        }else{
            alert(`Error : ${json.result.msg}`);
        }
    }
    
    compareChartsFillCharts(jsons);

    hideElement(compareChartsLoader);
    showElement(compareChartsContent);
    
}

function compareChartsCheckInputs(){
    if(compareChartsUsername1Input === undefined
        && compareChartsUsername2Input === undefined
        && compareChartsUsername3Input === undefined)
        return false;
    
    if(!compareChartsUsername1Input.value
        && !compareChartsUsername2Input.value
        && !compareChartsUsername3Input.value)
        return false;

    return true;
}

function compareChartsFillCharts(userDatas){
    const monthsYears = userDatas.flatMap(u => u.deezerData.flatMap(d => d.monthsData.flatMap(m => {
        return {
            year: d.year,
            month: common.months.getMonthNumberFromName(m.month)
        };
    })))
        .sort((a, b) => {
            if(a.year < b.year) return -1;
            if(a.year > b.year) return 1;
            if(a.year == b.year){
                if(a.month < b.month) return -1;
                if(a.month > b.month) return 1;
            }
            return 0;
        })
        .filter((v, i, a) => a.indexOf(a.find(item => item.year == v.year && item.month == v.month)) === i);

    const deezerUserData = [];
    for(let user of userDatas){
        let deezerData = [];
        for(let monthYear of monthsYears){
            let userData = findUserData(user.deezerData, monthYear.year, monthYear.month);
            deezerData.push({
                id: `${common.months.getMonthNameFromNumber(monthYear.month)} ${monthYear.year}`,
                songs: userData?.songs,
                minutes: userData?.minutes,
                songsPerDay: userData?.songsPerDay
            })
        }
        deezerUserData.push({
            user: user.name,
            data: deezerData
        })
    }

    compareChart.data.datasets = deezerUserData.map((d, i) => {
        return {
            label: d.user,
            backgroundColor: getChartColor(i),
            borderColor: getChartColor(i),
            data: d.data,
            parsing: {
                yAxisKey: compareChartsAxisSelect?.value ?? 'songs'
            },
            spanGaps: true,
        };
    });
    
    compareChart.update();
}

function getChartColor(index){
    switch (index) {
        case 0:
            return 'rgb(255, 99, 132)';
        case 1:
            return 'rgb(132, 255, 99)';
        case 2:
            return 'rgb(99, 132, 255)';
        default:
            return 'rgb(0, 0, 0)'
    }
}

function findUserData(userData, year, month){
    let userYearData = userData.find(d => d.year == year);
    if(!userYearData) return null;
    let userMonthData = userYearData.monthsData.find(d => common.months.getMonthNumberFromName(d.month) == month)
    return !userMonthData ? null : userMonthData;
}

function changeChartAxis(){
    for(let dataset of compareChart.data.datasets){
        dataset.parsing.yAxisKey = compareChartsAxisSelect?.value ?? 'songs'
    }
    compareChart.update();
}