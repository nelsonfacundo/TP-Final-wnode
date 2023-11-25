const { ObjectId } = require('mongodb');
const conn = require('./conn');
const constants = require('../lib/constants');

async function dataAccess() {
  return await conn.dataAccess(constants.DATABASE, constants.PETS);
}


// http://localhost:3000/api/pets/
async function getAllPets(pageSize, page){
    const collection = await dataAccess();
    const pets = await collection
                        .find({}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return pets;
}

// http://localhost:3000/api/pets/adoptables/
async function getAdoptables(pageSize, page){
    const collection = await dataAccess();
    const pets = await collection
                        .find({ status: "available" })
                        .limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return pets;
}

// http://localhost:3000/api/pets/654d0accb9a1d6ef179b2668
async function getPet(id){
    const collection = await dataAccess();
    const pet = await collection
                        .findOne({_id:new ObjectId(id)});    
    return pet;
}
// http://localhost:3000/api/pets/searchPetsBySpecie?specie=perro
async function getPetsBySpecie(specie){
    const collection = await dataAccess();
    const pets = await collection
                        .find({specie})
                        .toArray();
    return pets;
}

// http://localhost:3000/api/pets/searchPetsByRace?race=chihuahua
async function getPetsByRace(race){
    const connectiondb = await conn.getConnection();
    const pets = await connectiondb
                        .db(DATABASE)
                        .collection(PETS)
                        .find({race})
                        .toArray();
    return pets;
}



// http://localhost:3000/api/pets/searchPetsByFemaleGender
async function getPetsByFemaleGender(){
    const collection = await dataAccess();
    const pets = await collection
                        .find({
                            gender: "female" 
                          })
                        .toArray(); 
    return pets
}

// http://localhost:3000/api/pets/searchPetsByMaleGender
async function getPetsByMaleGender(){
    const collection = await dataAccess();
    const pets = await collection
                        .find({
                            gender: "male" 
                          })
                        .toArray(); 
    return pets
}

// http://localhost:3000/api/pets/searchPetsByAge0to5years
async function getPetsByAge0to5years(){
  const collection = await dataAccess();
  const pets = await collection
                      .find({
                          age: { $gte: 0, $lte: 5 }
                      })
                      .toArray(); 
  return pets;
}

// http://localhost:3000/api/pets/searchPetsByAge6to10years
async function getPetsByAge6to10years(){
    const collection = await dataAccess();
    const pets = await collection
                        .find({
                          age: { $gte: 6, $lte: 10 }
                          })
                        .toArray(); 
    return pets;
}

// http://localhost:3000/api/pets/searchPetsByAge11to15years
async function getPetsByAge11to15years(){
    const collection = await dataAccess();
    const pets = await collection
                        .find({
                          age: { $gte: 11, $lte: 15 }
                          })
                        .toArray(); 
    return pets;
}

// http://localhost:3000/api/pets/searchPetsByAge16AndMore
async function getPetsByAge16AndMore(){
    const collection = await dataAccess();
    const pets = await collection
                        .find({
                            age: { $gte: 16 } // Edad mayor o igual a 16
                          })
                        .toArray(); 
    return pets;
}

// http://localhost:3000/api/pets/searchPetsByProvinceBuenosAires
async function getPetsByProvinceBuenosAires(){
    const connectiondb = await conn.getConnection();
    const pets = await connectiondb
                        .db(DATABASE)
                        .collection(PETS)
                        .find({
                            province: "Buenos Aires" 
                          })
                        .toArray(); 
    return pets;
}

//http://localhost:3000/api/pets/searchPetsByProvinceSantaFe
async function getPetsByProvinceSantaFe(){
    const collection = await dataAccess();
    const pets = await collection
                        .find({
                            province: "Santa Fe" 
                          })
                        .toArray(); 
    return pets;
}

//http://localhost:3000/api/pets/searchPetsByProvinceCordoba
async function getPetsByProvinceCordoba(){
    const collection = await dataAccess();
    const pets = await collection
                        .find({
                            province: "Cordoba"
                          })
                        .toArray(); 
    return pets;
}

//http://localhost:3000/api/pets/addPet
// Función para crear una mascota
async function addPet(pet) {
  const collection = await dataAccess();
  const result = await collection
                        .insertOne(pet);
      return result;
}

// http://localhost:3000/api/pets/updatePet/654d24c88350cd054198ccc3
// Función para crear una mascota
async function updatePet(id, pet) {
  const collection = await dataAccess();
  const filter = { _id:new ObjectId(id) }; 
  const update = { $set: pet };
  const result = collection
                        .findOneAndUpdate(filter, update, { returnOriginal: false });

  return result;
}

// Función para borrar una mascota
// http://localhost:3000/api/pets/654d24c88350cd054198ccc3
async function deletePet(id) {
    const collection = await dataAccess();
    const filter = { _id:new ObjectId(id) }; 
    const result = collection
    .findOneAndDelete(filter);

    return result;
  }

module.exports = {
    getAllPets,
    getPet,
    getPetsBySpecie,
    getPetsByRace,
    getPetsByFemaleGender,
    getPetsByMaleGender,
    getPetsByAge0to5years,
    getPetsByAge6to10years,
    getPetsByAge11to15years,
    getPetsByAge16AndMore,
    getPetsByProvinceBuenosAires,
    getPetsByProvinceSantaFe,
    getPetsByProvinceCordoba,
    addPet,
    updatePet,
    deletePet,
    getAdoptables
};