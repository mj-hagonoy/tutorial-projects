const exerDb = require('./user_exercises')

const getUserLogs = async (user_id, opts = {}) => {
  //console.log(`getUserLogs for user: ${user_id}, opts: `, opts);
  let result = exerDb.getUserExercises(user_id, opts);
  return result;
}

module.exports = {getUserLogs}