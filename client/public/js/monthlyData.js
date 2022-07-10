async function init(){
    let json = await getMonthlyData('bencochoco', 2022, 'Juin');
    console.log(json);
}

init();