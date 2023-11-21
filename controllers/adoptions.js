const adoptionsData = require('../data/adoptions.js');
const petsData = require('../data/pets.js');
const usersData = require('../data/users.js');


async function getAllAdoptions(pageSize, page) {
  return adoptionsData.getAllAdoptions(pageSize, page);
}

async function addAdoption(petId, userId) {
  const errorMsg = 'La adopción no es posible';
  const pet = await petsData.getPet(petId);

  if (!pet || pet.status == 'pending approval') {
    throw new Error(errorMsg);
  }
  const adopter = await usersData.getUser(userId);
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



module.exports = { getAllAdoptions, addAdoption, getAwaitingAdoptions };
