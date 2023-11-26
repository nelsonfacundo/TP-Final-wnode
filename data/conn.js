require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let instance = null;

async function getConnection() {
  try {
    if (instance == null) {
      instance = await client.connect();
      console.log('Connectado a la db con exito');
    }
    return instance;
  } catch (error) {
    console.error('Error Connectado a la db:', error);
    throw error; 
  }
}

async function dataAccess(database, theCollection) {
  try {
    const connectiondb = await getConnection();
    return connectiondb.db(database).collection(theCollection);
  } catch (error) {
    console.error('Error accessing data:', error);
    throw error;
  }
}

module.exports = { dataAccess };
