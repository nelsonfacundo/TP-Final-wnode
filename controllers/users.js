const users = require("../data/users");

async function addUser(user) {
  return users.addUser(user);
}

module.exports = { addUser };
