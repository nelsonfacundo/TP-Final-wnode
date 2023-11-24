const conn = require('./conn');
const { ObjectId } = require('mongodb');
const constants = require('../lib/constants.js');


async function dataAccess() {
  return await conn.dataAccess(constants.DATABASE, constants.ADOPTIONS);
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

async function aprooveAdoption(id) { // TODO: tal vez queremos modificar a approve
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

//Quitar solicitud
async function deleteAdoption(id) {
  const collection = await dataAccess();
  const filter = { _id: new ObjectId(id) };

  if (!result || typeof result !== 'object') {
    throw new Error('Error al intentar eliminar adopción.');
  }
  const result = await collection.findOneAndDelete(filter);

  return result;
}

async function updateAdoption(id, adoption) {
  const collection = await dataAccess();
  
  const filter = { _id: new ObjectId(id) };
  const update = { $set: adoption };

  const result = await collection.findOneAndUpdate(filter, update, { returnOriginal: false });

  return result.value; 
}



module.exports = { 
  getAllAdoptions, 
  addAdoption, 
  getAwaitingAdoptions,
  getAdoption,
  aprooveAdoption,
  deleteAdoption,
  updateAdoption
 }