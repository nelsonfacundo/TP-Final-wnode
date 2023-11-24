const express = require("express");
const router = express.Router();
const controller = require("../controllers/pets");
const schemaPets = require("../schemas/validatePets");
const message = require("../lib/messages");
const errors = require("../lib/errors");

router.get("/", async (req, res) => {
	try {
		const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
		const page = req.query.page ? parseInt(req.query.page) : 0;

		const pets = await controller.getAllPets(pageSize, page);
		return res.json(pets);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
});

router.get("/searchPetsBySpecie", async (req, res) => {
	try {
		const specie = req.query.specie;
		const pets = await controller.getPetsBySpecie(specie);
		return res.json(pets);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
});

router.get("/searchPetsByRace", async (req, res) => {
	try {
		const race = req.query.race;
		const pets = await controller.getPetsByRace(race);
		return res.json(pets);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
});

router.get("/searchPetsByFemaleGender", async (req, res) => {
	try {
		const pets = await controller.getPetsByFemaleGender();
		return res.json(pets);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
});

router.get("/searchPetsByMaleGender", async (req, res) => {
	try {
		const pets = await controller.getPetsByMaleGender();
		return res.json(pets);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
});

// Add similar error handling for other routes...

router.post("/addPet", async (req, res) => {
	try {
		schemaPets.validatePets(req.body);
		const result = await controller.addPet(req, res);
		if (result.acknowledged) {
			return res.send(
				message.SUCCESSFULL_PET_ADDED + " con id: " + result.insertedId
			);
		} else {
			return res.status(500).send(errors.REQUEST_ERROR);
		}
	} catch (error) {
		console.error(error);
	}
});

router.put("/updatePet/:id", async (req, res) => {
	try {
		schemaPets.validatePets(req.body);
		const result = await controller.updatePet(req, res);
		if (result.lastErrorObject && result.lastErrorObject.n > 0) {			
			return res.send(message.SUCCESSFULL_PET_UPLOAD);
		} else {
			return  res.status(500).send(errors.REQUEST_ERROR);
		}
	} catch (error) {
    console.error(error);
		return res.status(500).send({ error: error.message });
	}
});

router.delete("/deletePet/:id", async (req, res) => {
  // TODO: no estamos mostrando el mensaje de exito cuando se borra una mascota
	try {
		const result = await controller.deletePet(req, res);    
		if (result.lastErrorObject && result.lastErrorObject.n > 0) {
			return res.status(200).send(message.SUCCESSFULL_PET_DELETE);
		} 
	} catch (error) {
		console.error(error);
		return res.status(400).json({ error: error.message });
	}
});

module.exports = router;
