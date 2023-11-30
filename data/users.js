const conn = require("./conn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const constants = require("../lib/constants");
const errors = require("../lib/errors");
const { ObjectId } = require("mongodb");

async function dataAccess() {
  return await conn.dataAccess(constants.DATABASE, constants.USERS);
}

// http://localhost:5000/api/pets/
async function getAllUsers(pageSize, page) {
  const collection = await dataAccess();
  const totalUsers = await collection.countDocuments();

  const users = await collection
    .find({})
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return { totalUsers, users };
}

async function addUser(user) {
  const collection = await dataAccess();
  const existingUser = await getUserByEmail(user.email);

  if (!existingUser) {
    user.password = await bcrypt.hash(user.password, 8);
    const result = await collection.insertOne(user);

    return result && result.acknowledged ? result : null;
  } else {
    throw new Error(errors.REGISTERED_EMAIL);
  }
}

async function findByCredentials(email, password) {
  const collection = await dataAccess();

  const user = await collection.findOne({ email: email });
  if (!user) {
    throw new Error(errors.REQUEST_ERROR);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error(errors.REQUEST_ERROR);
  }
  return user;
}

async function getUserByEmail(email) {
  const collection = await dataAccess();
  const user = await collection.findOne({ email: email });
  return !!user;
}

async function  getUser(id) {
  const collection = await dataAccess();
  const user = await collection.findOne({ _id: new ObjectId(id) });
  return user;
}

function generateAuthToken(user) {
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role, // TODO: queremos cambiar a rol?
    },
    process.env.CLAVE_SECRETA
  );
  return token;
}

module.exports = {
  addUser,
  findByCredentials,
  generateAuthToken,
  getUser,
  getAllUsers,
};
