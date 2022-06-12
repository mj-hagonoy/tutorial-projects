const srv = require('../services/stock')
const ipSrv = require('../services/ip')

const toArray = (inputs) => {
    if(typeof inputs === 'string'){
        return [inputs]
    }   
    return inputs;
}

const convertToResponse = (stockInfo, likeCounts) => {  
    if(stockInfo.length == 0) return {};
    if(stockInfo.length == 1){
        return {stockData: {...stockInfo[0], likes: likeCounts[stockInfo[0].stock]}};
    }
    stockInfo.forEach(info => {
        info['rel_likes'] = likeCounts[info.stock];
    })
       
    return {stockData: stockInfo };
}

const GetStockPrice = async (ip, like = false, stockSymbol) => {
    let stocks = toArray(stockSymbol) 
    if(like) ipSrv.AddLike(ip, stocks)

    return await srv.GetStockPrice(like, stocks).then(stockInfo => {
        let likeCounts = ipSrv.GetLike(stocks);
        return convertToResponse(stockInfo, likeCounts);
    })    
}

module.exports = {GetStockPrice};
