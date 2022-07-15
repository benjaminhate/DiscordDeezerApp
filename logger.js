module.exports = function (req, res, next){
    if(req.originalUrl.startsWith("/api")){
        console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl} ${`- BODY : ${JSON.stringify(req.body)}`}`);
    }
    next();
};