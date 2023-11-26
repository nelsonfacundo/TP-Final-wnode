const conn = require("./conn");
const { ObjectId } = require("mongodb");
const constants = require("../lib/constants.js");
const petsData = require("../data/pets.js");
const usersData = require("../data/users.js");

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

async function addAdoption(petId, adopterId) {
	try {
		if (!petId || !adopterId) {
			throw new Error("petId y adopterId son necesarios");
		}

		const pet = await petsData.getPet(petId);
		const adopter = await usersData.getUser(adopterId);

		if (!pet) {
			throw new Error("la mascota no existe");
		} else if (pet.status != "available") {
			throw new Error("la mascota no esta disponible");
		} else if (!adopter) {
			throw new Error("Usuario no encontrado");
		} else {
			const newAdoption = {
				_id: pet._id,
				name: pet.name,
				specie: pet.specie,
				race: pet.race,
				gender: pet.gender,
				age: pet.age,
				description: pet.description,
				province: pet.province,
				status: "awaiting",
				adopter: adopterId,
			};

			const petAdoption = await petsData.updatePet(petId, newAdoption);

			if (!petAdoption.value) {
				const notUpdatedError = new Error("Pet not updated");
				notUpdatedError.status = 404;
				throw notUpdatedError;
			} else {
				return {
					status: 200,
					message: "Adopción realizada",
					pet: petAdoption.value,
				};
			}
		}
	} catch (error) {
		throw new Error("No se pudo realizar la adopción: " + error);
	}
}

async function getAwaitingAdoptions() {
	const collection = await dataAccess();
	const result = await collection.find({ status: "awaiting" }).toArray();

	return result;
}

async function getAdoption(id) {
	const collection = await dataAccess();
	const adoption = await collection.findOne({ _id: new ObjectId(id) });

	if (!adoption) {
		throw new Error("Error al buscar adopción");
	}

	return adoption;
}

async function aprooveAdoption(id) {
	// TODO: tal vez queremos modificar a approve
	if (!ObjectId.isValid(id)) {
		throw new Error("La solicitud no pudo aprobarse");
	}
	const collection = await dataAccess();
	const result = await collection.findOneAndUpdate(
		{ _id: new ObjectId(id) },
		{ $set: { status: "aprooved" } },
		{ returnDocument: "after" }
	);
	console.log("Resultado de actualización: ", result);

	if (result.matchedCount === 0) {
		throw new Error("Solicitud rechazada");
	}

	return result;
}

//Quitar solicitud
async function deleteAdoption(id) {
	const collection = await dataAccess();
	const filter = { _id: new ObjectId(id) };

	if (!result || typeof result !== "object") {
		throw new Error("Error al intentar eliminar adopción.");
	}
	const result = await collection.findOneAndDelete(filter);

	return result;
}

async function updateAdoption(id, adoption) {
	const collection = await dataAccess();

	const filter = { _id: new ObjectId(id) };
	const update = { $set: adoption };

	const result = await collection.findOneAndUpdate(filter, update, {
		returnOriginal: false,
	});

	return result.value;
}

module.exports = {
	getAllAdoptions,
	addAdoption,
	getAwaitingAdoptions,
	getAdoption,
	aprooveAdoption,
	deleteAdoption,
	updateAdoption,
};
