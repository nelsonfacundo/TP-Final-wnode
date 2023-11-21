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

async function getAdoption(id) {
  const collection = await dataAccess();
  const adoption = await collection.findOne({ _id: new ObjectId(id) });

  if (!adoption) {
    throw new Error('Error al buscar adopción');
  }

  return adoption;
}

async function aprooveAdoption(id) {
  if (!ObjectId.isValid(id)) {
    throw new Error('La solicitud no pudo aprobarse');
  }
  const collection = await dataAccess();
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { status: 'aprooved' } },
    { returnDocument: 'after' }
  );
  console.log('Resultado de actualización: ', result);

  if (result.matchedCount === 0) {
    throw new Error('Solicitud rechazada');
  }

  return result;
}

module.exports = { 
  getAllAdoptions, 
  addAdoption, 
  getAwaitingAdoptions,
  getAdoption,
  aprooveAdoption
 }