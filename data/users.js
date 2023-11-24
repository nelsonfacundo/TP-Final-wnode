const conn = require("./conn");
const bcrypt = require("bcrypt");
const jwt =  require("jsonwebtoken");
const constants = require("../lib/constants");
const errors = require("../lib/errors");


async function dataAccess() {
  return await conn.dataAccess(constants.DATABASE, constants.USERS);
}

async function addUser(user) {
  user.password = await bcrypt.hash(user.password, 8);
  const collection = await dataAccess();
  const result = collection
    .insertOne(user);
  return result;
}


async function findByCredentials(email, password) {
  const collection = await dataAccess();

  const user = await collection
    .findOne({ email: email });
  if (!user) {
    throw new Error(errors.REQUEST_ERROR);
  }


  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error(errors.REQUEST_ERROR);
  }
  return user;
}


function generateAuthToken(user) {
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roll: user.roll
    }, process.env.CLAVE_SECRETA
  );
  return token;
}


module.exports = { addUser, findByCredentials, generateAuthToken };
