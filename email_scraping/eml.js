const EmlParser = require('eml-parser');
const html = require('./html')

exports.scrapAsync = async function(fileStream){
    return new Promise((resolve, reject) =>
        new EmlParser(fileStream)
        .getEmailBodyHtml()
        .then(htmlString  => {
            resolve(html.scrap(htmlString));
        })
        .catch(err  => {
            reject(err);
        })
    );
}