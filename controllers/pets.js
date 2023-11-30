const pets = require("../data/pets");

async function getAllPets(pageSize, page) {
	return pets.getAllPets(pageSize, page);
}

async function getPet(id) {
	return pets.getPet(id);
}

// Controlador para crear una mascota
async function addPet(req, res) {
	try {
		const { name, specie, race, gender, age, description, province } = req.body;
		if (name && specie && race && gender && age && description && province) {
			const newPet = {
				name,
				specie,
				race,
				gender,
				age,
				description,
				province,
				status: "available",
			};
			return pets.addPet(newPet);
		}
	} catch (error) {
		throw new Error("Bad Request: Missing required fields" + error);
	}
}

// Controlador para actualizar una mascota por su ID
async function updatePet(req, res) {
	try {
		const petId = req.params.id;
		const { name, specie, race, gender, age, description, province } = req.body;
		if (name && specie && race && gender && age && description && province) {
			const pet = { name, specie, race, gender, age, description, province };
			const updatedPet = await pets.updatePet(petId, pet);
			if (updatedPet) {
				return updatedPet;
			}
		} else {
			return null;
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// Controlador para eliminar una mascota por su ID
async function deletePet(req, res) {
	try {
		const petId = req.params.id;
		const petToDelete = await getPet(petId);
		if (petToDelete) {
			const deletedPet = await pets.deletePet(petId);
			if (deletedPet) {
				return res.json(deletedPet);
			}
		} else{
      throw new Error("Pet doesn't exist");
    }
	} catch (error) {
		console.error(error);
		throw error;
	}
}

module.exports = {
	getAllPets,
	getPet,
	getPetsBySpecie,
	getPetsByRace,
	getPetsByAge0to5years,
	getPetsByAge6to10years,
	getPetsByAge11to15years,
	getPetsByAge16AndMore,
	getPetsByProvinceBuenosAires,
	getPetsByProvinceSantaFe,
	getPetsByProvinceCordoba,
	getPetsByFemaleGender,
	getPetsByMaleGender,
	addPet,
	updatePet,
	deletePet,
};
