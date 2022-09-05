const compareChartsUsernameInput = document.getElementById("usernameCharts");

const compareChartsLoader = document.getElementById("compareChartsLoader");
const compareChartsContent = document.getElementById("compareChartsContent");

const config = {
    type: 'line',
    options: {
        parsing: {
            xAxisKey: 'id'
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

    let username = compareChartsUsernameInput.value;

    showElement(compareChartsLoader);

    let json = await getUserData(username);

    hideElement(compareChartsLoader);

    if(json.success){
        compareChartsFillCharts(json.result);
        showElement(compareChartsContent);
    }else{
        alert(`Error : ${json.result.msg}`);
    }
}

function compareChartsCheckInputs(){
    if(compareChartsUsernameInput === undefined)
        return false;
    
    if(!compareChartsUsernameInput.value)
        return false;

    return true;
}

function compareChartsFillCharts(userData){
    const deezerData = [];
    for(let data of userData.deezerData){
        for(let monthData of data.monthsData){
            deezerData.push({
                id: `${data.year}-${monthData.month}`,
                songs: monthData.songs,
                minutes: monthData.minutes,
                songsPerDay: monthData.songsPerDay
            })
        }
    }

    compareChart.data.datasets = [
        {
            label: 'Chansons écoutées',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: deezerData,
            parsing: {
                yAxisKey: 'songs'
            }
        },
        {
            label: 'Minutes écoutées',
            hidden: true,
            backgroundColor: 'rgb(132, 255, 99)',
            borderColor: 'rgb(132, 255, 99)',
            data: deezerData,
            parsing: {
                yAxisKey: 'minutes'
            },
        },
        {
            label: 'Chansons écoutées par jour',
            hidden: true,
            backgroundColor: 'rgb(99, 132, 255)',
            borderColor: 'rgb(99, 132, 255)',
            data: deezerData,
            parsing: {
                yAxisKey: 'songsPerDay'
            },
        }
    ];
    
    compareChart.update();
}