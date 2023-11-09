const express = require('express');
const router = express.Router();
const controller = require('../controllers/pets');
const schemaPets = require("../schemas/validatePets");
const message = require("../lib/messages");
const errors = require("../lib/errors");

// http://localhost:3000/api/pets/
router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllPets(pageSize, page));
});

// http://localhost:3000/api/pets/searchPetsBySpecie?specie=perro
router.get('/searchPetsBySpecie', async (req, res)=>{
    const specie = req.query.specie;

    res.json(await controller.getPetsBySpecie(specie));
});

// http://localhost:3000/api/pets/searchPetsByRace?race=chihuahua 
router.get('/searchPetsByRace', async (req, res)=>{
    const race = req.query.race;

    res.json(await controller.getPetsByRace(race));
});

// http://localhost:3000/api/pets/searchPetsByFemaleGender 
router.get('/searchPetsByFemaleGender', async (req, res)=>{
    res.json(await controller.getPetsByFemaleGender());
});

// http://localhost:3000/api/pets/searchPetsByMaleGender
router.get('/searchPetsByMaleGender', async (req, res)=>{
        res.json(await controller.getPetsByMaleGender());
});

// http://localhost:3000/api/pets/searchPetsByAge0to5years
router.get('/searchPetsByAge0to5years', async (req, res)=>{
    res.json(await controller.getPetsByAge0to5years());
});

// http://localhost:3000/api/pets/searchPetsByAge6to10years
router.get('/searchPetsByAge6to10years', async (req, res)=>{
    res.json(await controller.getPetsByAge6to10years());
});

// http://localhost:3000/api/pets/searchPetsByAge11to15years
router.get('/searchPetsByAge11to15years', async (req, res)=>{
    res.json(await controller.getPetsByAge11to15years());
});

// http://localhost:3000/api/pets/searchPetsByAge16AndMore
router.get('/searchPetsByAge16AndMore', async (req, res)=>{
    res.json(await controller.getPetsByAge16AndMore());
});

// http://localhost:3000/api/pets/searchPetsByProvinceBuenosAires
router.get('/searchPetsByProvinceBuenosAires', async (req, res)=>{
    res.json(await controller.getPetsByProvinceBuenosAires());
});

// http://localhost:3000/api/pets/searchPetsByProvinceSantaFe
router.get('/searchPetsByProvinceSantaFe', async (req, res)=>{
    res.json(await controller.getPetsByProvinceSantaFe());
});

// http://localhost:3000/api/pets/searchPetsByProvinceCordoba
router.get('/searchPetsByProvinceCordoba', async (req, res)=>{
    res.json(await controller.getPetsByProvinceCordoba());
});

// http://localhost:3000/api/pets/654d0accb9a1d6ef179b2668
router.get('/:id', async (req, res) => {
    res.json(await controller.getPet(req.params.id));
});

// Ruta para crear una mascota:
// http://localhost:3000/api/pets/addPet
router.post("/addPet", async (req, res) => {
    try {
      schemaPets.validatePets(req.body);
      const result = await controller.addPet(req, res);
      if (result.acknowledged) {
        res.send(message.SUCCESSFULL_PET_ADDED);
      } else {
        res.status(500).send(errors.REQUEST_ERROR);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
// Ruta para actualizar una mascota por su ID
// http://localhost:3000/api/pets/updatePet/654d24c88350cd054198ccc3
router.put("/updatePet/:id", async (req, res) => {
    try {
      schemaPets.validatePets(req.body);
      const result = await controller.updatePet(req, res);
      if (result.acknowledged) {
        res.send(message.SUCCESSFULL_PET_UPLOAD);
      } else {
        res.status(500).send(errors.REQUEST_ERROR);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
});

// Ruta para eliminar una mascota por su ID
// http://localhost:3000/api/pets/deletePet/654d24c88350cd054198ccc3
router.put("/deletePet/:id", async (req, res) => {
    try {
      const result = await controller.deletePet(req, res);
      if (result.acknowledged) {
        res.send(message.SUCCESSFULL_PET_DELETE);
      } else {
        res.status(500).send(errors.REQUEST_ERROR);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
});


router.delete('/deletePet/:id', controller.deletePet);


module.exports = router;