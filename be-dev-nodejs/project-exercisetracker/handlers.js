const usersDb = require('./db/users')
const exerDb = require('./db/user_exercises')
const logsDb = require('./db/logs')
const cleanUp = require('./db/cleanup')


const AddUserExercise = (user_id, data) => {
  return exerDb.addUserExercise(user_id, data); 
};

const CreateUser = (data) => {
  return usersDb.createUser(data);
};

const ListUsers = () => {
  return usersDb.listUsers();
};

const ListUserLogs = (user_id, opts) => {
  let {from, to, limit} = opts;
  return logsDb.getUserLogs(user_id, {from: new Date(from), to: new Date(to), limit});
}

const CleanUp = () => {
  exerDb.cleanCache();
  cleanUp();
  usersDb.cleanCache();;
}

module.exports = {AddUserExercise, CreateUser, ListUsers, ListUserLogs, CleanUp}