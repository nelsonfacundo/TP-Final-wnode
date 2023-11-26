const adoptionsData = require('../data/adoptions.js');
const petsData = require('../data/pets.js');
const usersData = require('../data/users.js');


async function getAllAdoptions(pageSize, page) {
  return adoptionsData.getAllAdoptions(pageSize, page);
}

async function addAdoption(petId, adopterId) {
  return adoptionsData.addAdoption(petId, adopterId);  
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
