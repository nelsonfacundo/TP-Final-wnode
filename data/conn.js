require("dotenv").config();
const mongoclient = require("mongodb").MongoClient;
//const uri= "mongodb+srv://noeliataboadavega:123456abc@cluster0.kn1swxq.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb+srv://admin:admin@tpintegrador.kdtimns.mongodb.net/";
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
  return await connectiondb
    .db(database)
    .collection(theCollection);
}

module.exports = { dataAccess };
