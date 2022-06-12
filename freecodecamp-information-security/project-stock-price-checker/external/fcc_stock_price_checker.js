const { rejects } = require('assert');
const http = require('https');

const fccStockPriceUrl = "https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock"

const createFccPriceCheckUrl = (stockSymbol) => {
    return `${fccStockPriceUrl}/${stockSymbol}/quote`;
}

const GetStockPrice = (stockSymbol = '') => {
    if(stockSymbol == '') return {};
    let url =  createFccPriceCheckUrl(stockSymbol.toLowerCase());
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            var body = '';
            res.on('data', (chunk) => body += chunk)
            res.on('end', () => {
                let {latestPrice: price, symbol: stock} = JSON.parse(body);
                resolve({price, stock})
            })
        }).on('error', reject);
    })    
}


module.exports = GetStockPrice;