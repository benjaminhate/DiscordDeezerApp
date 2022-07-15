const baseUrl = "http://localhost:3000/api"

async function send(method, url, jsonPayload = null) {
    let options = {
        method: method
    };
    if (jsonPayload !== null) {
        options.body = JSON.stringify(jsonPayload);
        options.headers = {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await fetch(`${baseUrl}/${url}`, options);
        return {
            success: res.ok,
            result: await res.json()
        };
    } catch (err) {
        return console.error(err);
    }
}

function getMonthlyData(user, year, month) {
    let url = `deezer/${user}/${year}/${month}`;
    return send('GET', url);
}

function postMonthlyData(user, year, month, data) {
    let url = `deezer/${user}/${year}/${month}`;
    return send('POST', url, data);
}

function getMonthlyMessage(user, year, month) {
    let url = `discord/generate/${user}/${year}/${month}`
    return send('GET', url);
}

function getCompareMessage(user, year1, month1, year2, month2) {
    let url = `discord/generate/${user}/${year1}/${month1}/compare/${user}/${year2}/${month2}`
    return send('GET', url);
}

function getCompareMessageFromPreviousMonth(user, year, month) {
    let previousMonth = months.getPreviousMonth(month);
    let previousYear = months.getMonthNumberFromName(previousMonth) == 12 ? year - 1 : year;
    return getCompareMessage(user, previousYear, previousMonth, year, month);
}