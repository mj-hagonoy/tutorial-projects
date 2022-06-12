const FccGetStockPrice = require('../external/fcc_stock_price_checker')

const GetStockPrice = async (like, stockSymbols = []) => {
    let promises = stockSymbols.map((symbol) => {
        return FccGetStockPrice(symbol);
    })
    return Promise.all(promises);
}

module.exports = {GetStockPrice}
