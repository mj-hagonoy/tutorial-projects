// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var {getDate} = require('./dateHandler')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", (req, res, next) => {
  let { date } = req.params || {date: ''}
  let r = getDate(date)
  let code = 200;
  if (r.error) {
    code = 400
  }
  res.status(code).json(r)
  next()
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
