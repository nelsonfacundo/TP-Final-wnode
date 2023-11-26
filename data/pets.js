const { ObjectId } = require("mongodb");
const conn = require("./conn");
const constants = require("../lib/constants");

async function dataAccess() {
	return await conn.dataAccess(constants.DATABASE, constants.PETS);
}

// http://localhost:3000/api/pets/
async function getAllPets(pageSize, page) {
	const collection = await dataAccess();
	const totalPets = await collection.countDocuments();

	const pets = await collection
		.find({})
		.limit(pageSize)
		.skip(pageSize * page)
		.toArray();
	return { totalPets, pets };
}

// http://localhost:3000/api/pets/adoptables/
async function getAdoptables(pageSize, page) {
	const collection = await dataAccess();
	const totalPets = await collection.countDocuments({ status: "available" });

	const pets = await collection
		.find({ status: "available" })
		.limit(pageSize)
		.skip(pageSize * page)
		.toArray();
	return { totalPets, pets };
}

// http://localhost:3000/api/pets/654d0accb9a1d6ef179b2668
async function getPet(id) {
	const collection = await dataAccess();
	const pet = await collection.findOne({ _id: new ObjectId(id) });
	return pet;
}

//http://localhost:3000/api/pets/addPet
// Función para crear una mascota
async function addPet(pet) {
	const collection = await dataAccess();
	const result = await collection.insertOne(pet);
	return result;
}

// http://localhost:3000/api/pets/updatePet/654d24c88350cd054198ccc3
// Función para crear una mascota
async function updatePet(id, pet) {
	const collection = await dataAccess();
	const filter = { _id: new ObjectId(id) };
	const update = { $set: pet };
	const result = collection.findOneAndUpdate(filter, update, {
		returnOriginal: false,
	});

	return result;
}

// Función para borrar una mascota
// http://localhost:3000/api/pets/654d24c88350cd054198ccc3
async function deletePet(id) {
	const collection = await dataAccess();
	const filter = { _id: new ObjectId(id) };
	const result = collection.findOneAndDelete(filter);

	return result;
}

module.exports = {
	getAllPets,
	getPet,
	addPet,
	updatePet,
	deletePet,
	getAdoptables,
};
