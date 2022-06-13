const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('get price for 1 stock, responds with JSON data with format {stockData: {stock:"", price: 0, likes: 0}}', (done)=> {
        chai.request(server)
            .get('/api/stock-prices')
            .query({stock: 'GOOG'})
            .then((res) => {
                assert.containsAllKeys(res.body, ['stockData']);
                assert.containsAllKeys(res.body.stockData, ['stock', 'price', 'likes']);
            })
            .catch((err) => {
                console.log(err, `error occured: `. err)
            })
            .finally(done())
    })

    test('get price for 2 stocks, responds with JSON data with format {stockData: [ {stock:"", price: 0, rel_likes: 0} ]}', (done)=> {
        chai.request(server)
            .get('/api/stock-prices')
            .query({stock: ['MSFT', 'GOOG']})
            .then((res) => {
                assert.containsAllKeys(res.body, ['stockData']);
                let [stock1, stock2] = res.body.stockData;
                assert.isDefined(stock1)
                assert.isDefined(stock2)
                assert.containsAllKeys(stock1, ['stock', 'price', 'rel_likes'] )
                assert.containsAllKeys(stock2, ['stock', 'price', 'rel_likes'] )  
            })
            .catch((err) => {
                console.log(err, `error occured: `. err)
            })
            .finally(done())
    })
});
