const srv = require('../services/stock')

const toArray = (inputs) => {
    if(typeof inputs === 'string'){
        return [inputs]
    }   
    return inputs;
}

const convertToResponse = (result) => {  
    if(result.length <= 1){
        return {stockData: result[0] || {}};
    }   
    return {stockData: result };
}

const GetStockPrice = async (like, stockSymbol) => {
    let stocks = toArray(stockSymbol) 

    return await srv.GetStockPrice(like, stocks).then(resp => {
        return convertToResponse(resp);
    })    
}

module.exports = {GetStockPrice};
