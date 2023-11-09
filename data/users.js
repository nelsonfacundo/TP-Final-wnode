const conn = require("./conn");
const bcrypt = require("bcrypt");
const constants = require("../lib/constants");

async function addUser(user) {
  const connectiondb = await conn.getConnection();
  user.password = await bcrypt.hash(user.password, 8);
  const result = connectiondb
    .db(constants.DATABASE)
    .collection(constants.USERS)
    .insertOne(user);
  return result;
}

module.exports = { addUser };
