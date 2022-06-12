require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const dns = require('dns')
const {URL} = require('url');
var bodyParser = require('body-parser');

var shortUrls = [];

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl', function(req, res) {

  try{
      let url = req.body.url
      const urlObj = new URL(url);
    const httpRegex = /^(http|https)(:\/\/)/;
    if (!httpRegex.test(req.body.url)) {return res.json({ error: 'invalid url' })}
  
    dns.lookup(urlObj.hostname, (err, address, family) => {
      if(err){
        return res.status(400).json({ error: 'invalid url' });
      }else{
        shortUrls.push(url)
        return res.status(200).json({
          short_url: shortUrls.length, 
          original_url: url
        })
      }
    })
  }catch(err){
     return res.status(400).json({ error: 'invalid url' });
   
  }

});

app.get('/api/shorturl/:id', (req, res) => {
  let {id} = req.params;
  let sId = parseInt(id) - 1;
  if(sId < 0 || sId >= shortUrls.length){
    res.status(400).json({ error: 'invalid url' });
  }else{
    res.writeHead(302, {
      'Location': shortUrls[sId]
    })
    res.end();
  }
  
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
