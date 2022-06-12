const ipDB = require('../db/ips');

const AddLike = (ip, stocks = []) => {
    stocks.forEach(stock => {
        ipDB.Save({ip: ip, stock})
    })
}

const GetLike = (stocks = []) => {
    if(stocks.length == 0) return;
    if(stocks.length < 2){
        return ipDB.GetLikeCount(stocks[0]);
    }
    return ipDB.GetRelLikeCount(stocks[0], stocks[1]);
}

module.exports = {AddLike, GetLike};