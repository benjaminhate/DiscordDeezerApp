const baseUrl = "http://localhost:3000/api"

function send(method, url, body = null){
    return fetch(`${baseUrl}/${url}`, {
        method: method,
        body: body
    })
    .then(res => res.json())
    .catch(err => console.error(err))
}

function getMonthlyData(user, year, month){
    let url = `deezer/${user}/${year}/${month}`;
    return send('GET', url);
}

function postMonthlyData(user, year, month, data){
    let url = `deezer/${user}/${year}/${month}`;
    return send('POST', url, data);
}