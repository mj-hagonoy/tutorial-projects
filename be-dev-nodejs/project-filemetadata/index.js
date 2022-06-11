var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
require('dotenv').config()

var app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/public', express.static(process.cwd() + '/public'));
app.use((req,res, next) => {
  console.log(`incoming request for url: `, req.url);
  next();
})

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  let {originalname: name, mimetype: type, size} = req.file || {name: '', type: '', size: 0};
  res.status(200).json({name, type, size});
  next();
})

app.use((err, req, res, next) => {
  console.log(err)
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
