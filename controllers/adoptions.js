const adoptionsData = require("../data/adoptions.js");

async function addAdoption(petId, adopterId) {
	return adoptionsData.addAdoption(petId, adopterId);
}

async function approveAdoption(id) {
	return adoptionsData.approveAdoption(id);
}

async function deleteAdoption(id) {
	return adoptionsData.deleteAdoption(id);
}

async function rejectAdoption(id) {
	return adoptionsData.rejectAdoption(id);
}

module.exports = {
	addAdoption,
	approveAdoption,
	deleteAdoption,
	rejectAdoption,
};
