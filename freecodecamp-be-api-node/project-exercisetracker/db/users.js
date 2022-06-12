const uuid = require('uuid')
const Database = require("@replit/database")
const db = new Database();
//const userPrefix = 'u_'

var userDB = {};
const cleanCache = () => {
  userDB = {};
}
const createUser =  (user = {}) => {
 // console.log(`createUser: `, user);
  let _id = uuid.v1();
  let newUser = {username: '', ...user, _id};
  
  //let key = await db.set(`${userPrefix}${_id}`, newUser);
  userDB[_id] = newUser;
  console.log(`new user created:` , newUser);
  return newUser;
}

const listUsers =  () => {
  let keys = Object.keys(userDB);//await db.list(userPrefix);
  let list = [];
  for(let i = 0; i < keys.length; i++){    
    let {username, _id} = userDB[keys[i]]
    list.push({username, _id});
  }
  
  return list;
}

const getUser =  (user_id) => {
  let user = userDB[user_id] || {_id: user_id, username: ""}//await db.get(`${userPrefix}${user_id}`);
  //console.log(`user with ${user_id}`, user);
  // if(!user) {
  //   return {user: {}, error: 'not found'};
  // }
  return {user};
}

module.exports = {createUser, listUsers, getUser, cleanCache}