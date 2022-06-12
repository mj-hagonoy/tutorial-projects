const Database = require("@replit/database")
const db = new Database();

const cleanUp = async () => {
  let keys = await db.list();
  for(let i = 0; i < keys.length; i++){
    await db.delete(keys[i]);
  }
}

module.exports = cleanUp;

