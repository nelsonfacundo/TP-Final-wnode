const conn = require("./conn");
const { ObjectId } = require("mongodb");
const constants = require("../lib/constants.js");
const petsData = require("../data/pets.js");
const usersData = require("../data/users.js");

async function dataAccess() {
	return await conn.dataAccess(constants.DATABASE, constants.ADOPTIONS);
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
					pet: newAdoption,
				};
			}
		}
	} catch (error) {
		throw new Error("No se pudo realizar la adopción: " + error);
	}
}

async function approveAdoption(id) {
	// TODO: tal vez queremos modificar a approve
	try {
		if (!id) {
			throw new Error("id es necesario");
		} else if (!ObjectId.isValid(id)) {
			throw new Error("El id no es valido");
		}

		const pet = await petsData.getPet(id);

		if (!pet) {
			throw new Error("la mascota no existe");
		} else if (pet.status == "adopted" ) {
			throw new Error("la adopcion ya fue aprobada");
		} else if (pet.status != "awaiting") {
			throw new Error("la mascota no tiene una adopcion para aprobar");
		} else {
			const approveAdoption = {
				_id: pet._id,
				name: pet.name,
				specie: pet.specie,
				race: pet.race,
				gender: pet.gender,
				age: pet.age,
				description: pet.description,
				province: pet.province,
				status: "adopted",
				adopter: pet.adopter,
			};

			const petAdoption = await petsData.updatePet(id, approveAdoption);

			if (!petAdoption.value) {
				const notUpdatedError = new Error("Pet not updated");
				notUpdatedError.status = 404;
				throw notUpdatedError;
			} else {
				return {
					status: 200,
					message: "Adopción aprobada",
					pet: approveAdoption,
				};
			}
		}
	} catch (error) {
		throw new Error("No se pudo realizar la adopción: " + error);
	}
}

//Quitar solicitud
async function rejectAdoption(id) {
	try {
		if (!id) {
			throw new Error("id es necesario");
		} else if (!ObjectId.isValid(id)) {
			throw new Error("El id no es valido");
		}

		const pet = await petsData.getPet(id);

		if (!pet) {
			throw new Error("la mascota no existe");
		} else if (pet.status == "rejected" ) {
			throw new Error("la adopcion ya fue rechazada");
		}  else {
			const rejectedAdoption = {
				_id: pet._id,
				name: pet.name,
				specie: pet.specie,
				race: pet.race,
				gender: pet.gender,
				age: pet.age,
				description: pet.description,
				province: pet.province,
				status: "rejected",
				adopter: pet.adopter,
			};

			const petAdoption = await petsData.updatePet(id, rejectedAdoption);

			if (!petAdoption.value) {
				const notUpdatedError = new Error("Pet not updated");
				notUpdatedError.status = 404;
				throw notUpdatedError;
			} else {
				return {
					status: 200,
					message: "Adopción rechazada",
					pet: rejectedAdoption,
				};
			}
		}
	} catch (error) {
		throw new Error("No se pudo realizar la adopción: " + error);
	}
}

async function deleteAdoption(id) {
  try {
		if (!id) {
			throw new Error("id es necesario");
		} else if (!ObjectId.isValid(id)) {
			throw new Error("El id no es valido");
		}

		const pet = await petsData.getPet(id);

		if (!pet) {
			throw new Error("la mascota no existe");
		} else if (pet.status == "available" ) {
			throw new Error("la adopcion ya fue borrada");
		}  else {
			const rejectedAdoption = {
				_id: pet._id,
				name: pet.name,
				specie: pet.specie,
				race: pet.race,
				gender: pet.gender,
				age: pet.age,
				description: pet.description,
				province: pet.province,
				status: "available",
				adopter: pet.adopter,
			};

			const petAdoption = await petsData.updatePet(id, rejectedAdoption);

			if (!petAdoption.value) {
				const notUpdatedError = new Error("Pet not updated");
				notUpdatedError.status = 404;
				throw notUpdatedError;
			} else {
				return {
					status: 200,
					message: "Adopción reseteada",
					pet: rejectedAdoption,
				};
			}
		}
	} catch (error) {
		throw new Error("No se pudo realizar la adopción: " + error);
	}
}

module.exports = {
	addAdoption,
	approveAdoption,
	rejectAdoption,
	deleteAdoption,
};
