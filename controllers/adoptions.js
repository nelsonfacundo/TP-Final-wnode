const adoptionsData = require("../data/adoptions.js");

async function addAdoption(petId, adopterId) {
	return adoptionsData.addAdoption(petId, adopterId);
}

async function aprooveAdoption(id) {
	return adoptionsData.aprooveAdoption(id);
}

async function deleteAdoption(id) {
	return adoptionsData.getAdoption(id);
}

async function rejectAdoption(id) {
	return adoptionsData.rejectAdoption(id);
}

module.exports = {
	addAdoption,
	aprooveAdoption,
	deleteAdoption,
	rejectAdoption,
};
