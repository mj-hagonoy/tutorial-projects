'use strict';

const {GetStockPrice} = require('../handlers/stock')

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){
      let {stock, like} = req.query || {like: false};
      GetStockPrice(like, stock).then(result => {
        res.status(200).json(result);
      })
      
    });
    
};
