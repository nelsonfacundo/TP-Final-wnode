const conn = require('./conn');
const { ObjectId } = require('mongodb');
const constants = require('../lib/constants.js');

async function dataAccess() {
  const connectiondb = await conn.getConnection();

  return await connectiondb
    .db(constants.ADOPTIONS)
    .collection(constants.ADOPTIONS);
}

