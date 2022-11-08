const fs = require('fs');
const { eml } = require('./email_scraping');

async function run(){
    const filePath = process.argv[2];
    try {
        const data = await eml.scrapAsync(fs.readFileSync(filePath));
        console.log(data);
    } catch(e) {
        console.error(e);
    }
}

run();