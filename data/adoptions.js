const conn = require('./conn');
const { ObjectId } = require('mongodb');
const constants = require('../lib/constants.js');

async function dataAccess() {
  const connectiondb = await conn.getConnection();

  return await connectiondb
    .db(constants.ADOPTIONS)
    .collection(constants.ADOPTIONS);
}

async function getAllAdoptions(pageSize, page) {
  const collection = await dataAccess();
  const adoptions = await collection
    .find({})
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();

  return adoptions;
}

async function addAdoption(adoption) {
  const collection = await dataAccess();

  const result = await collection.insertOne(adoption);
  return result;
}

async function getAwaitingAdoptions() {
  const collection = await dataAccess();
  const result = await collection.find({ status: 'awaiting' }).toArray();

  return result;
}

module.exports = { getAllAdoptions, addAdoption, getAwaitingAdoptions }