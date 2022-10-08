const fs = require('fs');
const { eml } = require('./email_scraping');

async function run(){
    let emailFile = fs.createReadStream('./email_scraping/emls/mail_2.eml');
    let data = await eml.scrapAsync(emailFile);

    console.log(data);
}

run();