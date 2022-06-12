const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const handlers = require('./handlers')

require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use((req, res, next) => {
  console.log(`Incoming request for url: ${req.url} `, req.body)
  next();
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', async (req, res, next) => {
  let {username} = req.body;
  let result = await handlers.CreateUser({username});
  console.log(result);
  res.json(result);
})

app.get('/api/users', async (req, res, next) => {
  let result = await handlers.ListUsers();
  console.log(result);
  res.json(result);
})

app.post('/api/users/:_id/exercises', async(req, res, next) => {
  let {_id} = req.params;
  let result = await handlers.AddUserExercise(_id, req.body);
  console.log(result);
  res.json(result);
})

app.get('/api/users/:_id/logs', async(req, res, next) => {
  let {_id} = req.params
  let {from, to, limit} = req.query;
  let now = new Date(8640000000000000);
  let defaultFrom  = new Date(0);
  let opts = {
    limit: parseInt(limit || '0'),
    from: from || `${defaultFrom.getFullYear()}-${defaultFrom.getMonth() + 1}-${defaultFrom.getDate()}`, 
    to: to || `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
  };
  
  let result = await handlers.ListUserLogs(_id, opts);
  console.log(result);
  res.json(result);
})

app.get('/clean', async(req, res, next) => {
  await  handlers.CleanUp();
  res.end()
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
