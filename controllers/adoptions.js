const adoptionsData = require('../data/adoptions.js');
const petsData = require('../data/pets.js');
const usersData = require('../data/users.js');


async function getAllAdoptions(pageSize, page) {
  return adoptionsData.getAllAdoptions(pageSize, page);
}

async function addAdoption(petId, adopterId) {
  const errorMsg = 'La adopción no es posible';

  if (!petId || !adopterId) {
    throw new Error( 'petId y adopterId son necesarios' );
  }

  const pet = await petsData.getPet(petId);

  if (!pet || pet.status == 'pending approval') {
    throw new Error(errorMsg);
  }
  const adopter = await usersData.getUser(adopterId);
  if (!adopter) {
    throw new Error(errorMsg);
  }
  const newAdoption = {
    pet: pet,
    adopter: adopter,
    status: 'awaiting',
  };

  return adoptionsData.addAdoption(newAdoption);
}

async function getAwaitingAdoptions() {
  return adoptionsData.getAwaitingAdoptions();
}

async function getAdoption(id) {
  return adoptionsData.getAdoption(id);
}

async function aprooveAdoption(id) {
  return adoptionsData.aprooveAdoption(id);
}

async function deleteAdoption(id) {
  return adoptionsData.getAdoption(id);
}

async function updateAdoption(id, updatedAdoption) {
  return adoptionsData.updateAdoption(id, updatedAdoption);
}

module.exports = { 
  getAllAdoptions, 
  addAdoption, 
  getAwaitingAdoptions,
  getAdoption,
  aprooveAdoption,
  deleteAdoption,
  updateAdoption
 };
