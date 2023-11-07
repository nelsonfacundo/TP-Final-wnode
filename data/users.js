const conn = require("./conn");
const bcrypt = require("bcrypt");
const DATABASE = "trabajo_final";
const USERS = "users";

async function addUser(user) {
  const connectiondb = await conn.getConnection();
  user.password = await bcrypt.hash(user.password, 8);
  const user = connectiondb.db(DATABASE).collection(USERS).insertOne(user);
  return user;
}

module.exports = { addUser };
