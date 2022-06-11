const uuid = require('uuid')
const Database = require("@replit/database")
const usersDb = require('./users')
const db = new Database();
const exerPrefix = 'e_'
var cacheUserExercise = {};

const updateCache = (user, {_date, date, duration, description}) => {
  let logs = cacheUserExercise[user._id] || {...user, count: 0, log: []}; 
  logs.log.push({_date, date, duration, description})
  logs.count = logs.log.length;
  cacheUserExercise[user._id] = logs;
  //console.log(`cache update `, cacheUserExercise[user._id])
}
const cleanCache = () => {
  cacheUserExercise = {};
}

const addUserExercise =  (user_id, exercise = {}) => {  
  let {error, user} = usersDb.getUser(user_id);
  if(error) return {};
  
  let _id = uuid.v1();
  let {date, description, duration} = exercise;
  let newExercise = {_date: new Date(), description, duration: parseInt(duration), user_id, _id};
  try{
    if(date) newExercise._date = new Date(date);
  }catch(err){
    console.log(err);
  }
  newExercise.date = newExercise._date.toDateString();
  
  //let key = await db.set(`${exerPrefix}${_id}`, newExercise)
  updateCache(user, {_date: newExercise._date, date: newExercise.date, duration: newExercise.duration, description});
  
  //console.log(`exercise attached to user: ${user_id} created with key:`, key,  newExercise);
  return {...user, date: newExercise.date, duration: newExercise.duration, description};
}

const getUserExercises = (user_id, opts = {}) => {
  //console.log(`getUserExercises for user_id:`, user_id, opts);
  let logs = cacheUserExercise[user_id] || {log: [], count: 0, username: "", _id: user_id};
  let {from, to, limit} = opts;
  
  // for(let i = 0; i < logs.log.length; i++){
  //   if(limit > 0 && list.length >= limit) break; 
  //   let {description, duration, date, _date} = logs.log[i];
  //   if(withinDateRange(new Date(_date), from, to)){
  //     list.push({description, duration, date})
  //   } 
  // }
  let list = logs.log.filter((exercise) => {
    let {_date} = exercise;
    return withinDateRange(new Date(_date), from, to);
  })
  if(limit > 0){
    list = list.slice(0, limit);
  }
  //console.log(`getUserExercises for user_id:`, user_id, list);
  return {_id: user_id, username: logs.username, log: list, count: list.length};
}

const withinDateRange = (date,from, to) => {
  let r = date >= from && date <= to;
  //console.log('withinDateRange', date, from, to, r);
  return r;  
}

module.exports = {addUserExercise, getUserExercises, cleanCache}