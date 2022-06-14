const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const {Reset} = require('../db/ips')

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Viewing one stock: GET request to /api/stock-prices/', (done)=> {
        Reset();
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

    test('Viewing one stock and liking it: GET request to /api/stock-prices/', (done) =>{
        Reset();
        chai.request(server)
            .get('/api/stock-prices')
            .query({stock: 'GOOG', like:true})
            .then((res) => {
                assert.containsAllKeys(res.body, ['stockData']);
                assert.containsAllKeys(res.body.stockData, ['stock', 'price', 'likes']);
                assert.isTrue(res.body.stockData.likes == 1)
            })
            .catch((err) => {
                console.log(err, `error occured: `. err)
            })
            .finally(done())
    })
    
    test('Viewing the same stock and liking it again: GET request to /api/stock-prices/', async (done) =>{
        Reset();
        await chai.request(server)
            .get('/api/stock-prices')
            .query({stock: 'GOOG', like:true})
            .finally(done())
        
        chai.request(server)
            .get('/api/stock-prices')
            .query({stock: 'GOOG', like:true})
            .then((res) => {
                assert.containsAllKeys(res.body, ['stockData']);
                assert.containsAllKeys(res.body.stockData, ['stock', 'price', 'likes']);
                assert.isTrue(res.body.stockData.likes == 1)
            })
            .catch((err) => {
                console.log(err, `error occured: `. err)
            })
            .finally(done())
    })

    test('Viewing two stocks: GET request to /api/stock-prices/', (done)=> {
        Reset();
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
    
    test('Viewing two stocks and liking them: GET request to /api/stock-prices/', (done) =>{
        Reset();
        chai.request(server)
            .get('/api/stock-prices')
            .query({stock: ['GOOG', 'MSFT'], like:true})
            .then((res) => {                
                assert.containsAllKeys(res.body, ['stockData']);
                let [stock1, stock2] = res.body.stockData;
                assert.isDefined(stock1)
                assert.isDefined(stock2)
                assert.containsAllKeys(stock1, ['stock', 'price', 'rel_likes'] )
                assert.containsAllKeys(stock2, ['stock', 'price', 'rel_likes'] )  
                assert.isTrue(stock1.rel_likes + stock2.rel_likes == 0)
            })
            .catch((err) => {
                console.log(err, `error occured: `. err)
            })
            .finally(done())
    })
});
