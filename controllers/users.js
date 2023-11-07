const users = require("../data/users");

async function addUser(user) {
    console.log(user)
  return users.addUser(user);
}

module.exports = { addUser };
