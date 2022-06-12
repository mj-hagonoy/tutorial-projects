'use strict';

const {GetStockPrice} = require('../handlers/stock')

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){
      let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      let {stock, like} = req.query || {like: false};
      GetStockPrice(ip, like == 'true', stock).then(result => {
        res.status(200).json(result);
      })
      
    });
    
};
