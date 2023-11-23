const conn = require("./conn");
const bcrypt = require("bcrypt");
const constants = require("../lib/constants");

async function dataAccess() {
  const connectiondb = await conn.getConnection();
  return await connectiondb
    .db(constants.DATABASE)
    .collection(constants.USERS);
}

async function addUser(user) {
  user.password = await bcrypt.hash(user.password, 8);
  const collection = await dataAccess();
  const result = collection
    .insertOne(user);
  return result;
}

module.exports = { addUser };
