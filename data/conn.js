require('dotenv').config();
const mongoclient = require('mongodb').MongoClient;

const uri = process.env.MONGODB;
const client = new mongoclient(uri);

let instance = null;

async function getConnection() {
  if (instance == null) {
    instance = await client.connect();
  }
  return instance;
}

async function dataAccess(database, theCollection) {
  const connectiondb = await getConnection();
  return await connectiondb.db(database).collection(theCollection);
}

module.exports = { dataAccess };
