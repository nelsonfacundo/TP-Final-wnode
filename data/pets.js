const { ObjectId } = require('mongodb');
const conn = require('./conn');
const DATABASE = 'sample_analytics';
const PETS = 'pets';

// http://localhost:3000/api/pets/
async function getAllPets(pageSize, page){
    const connectiondb = await conn.getConnection();
    const pets = await connectiondb
                        .db(DATABASE)
                        .collection(PETS)
                        .find({}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return pets;
}

// http://localhost:3000/api/pets/654d0accb9a1d6ef179b2668
async function getPet(id){
    const connectiondb = await conn.getConnection();
    const pet = await connectiondb
                        .db(DATABASE)
                        .collection(PETS)
                        .findOne({_id:new ObjectId(id)});    
    return pet;
}
// http://localhost:3000/api/pets/searchPetsBySpecie?specie=perro
async function getPetsBySpecie(specie){
    const connectiondb = await conn.getConnection();
    const pets = await connectiondb
                        .db(DATABASE)
                        .collection(PETS)
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
    const connectiondb = await conn.getConnection();
    const pets = await connectiondb
                        .db(DATABASE)
                        .collection(PETS)
                        .find({
                            gender: "female" 
                          })
                        .toArray(); 
    return pets
}

// http://localhost:3000/api/pets/searchPetsByMaleGender
async function getPetsByMaleGender(){
    const connectiondb = await conn.getConnection();
    const pets = await connectiondb
                        .db(DATABASE)
                        .collection(PETS)
                        .find({
                            gender: "male" 
                          })
                        .toArray(); 
    return pets
}

// http://localhost:3000/api/pets/searchPetsByAge0to5years
async function getPetsByAge0to5years(){
  const connectiondb = await conn.getConnection();
  const pets = await connectiondb
                      .db(DATABASE)
                      .collection(PETS)
                      .find({
                          age: { $gte: 0, $lte: 5 }
                      })
                      .toArray(); 
  return pets;
}

// http://localhost:3000/api/pets/searchPetsByAge6to10years
async function getPetsByAge6to10years(){
    const connectiondb = await conn.getConnection();
    const pets = await connectiondb
                        .db(DATABASE)
                        .collection(PETS)
                        .find({
                          age: { $gte: 6, $lte: 10 }
                          })
                        .toArray(); 
    return pets;
}

// http://localhost:3000/api/pets/searchPetsByAge11to15years
async function getPetsByAge11to15years(){
    const connectiondb = await conn.getConnection();
    const pets = await connectiondb
                        .db(DATABASE)
                        .collection(PETS)
                        .find({
                          age: { $gte: 11, $lte: 15 }
                          })
                        .toArray(); 
    return pets;
}

// http://localhost:3000/api/pets/searchPetsByAge16AndMore
async function getPetsByAge16AndMore(){
    const connectiondb = await conn.getConnection();
    const pets = await connectiondb
                        .db(DATABASE)
                        .collection(PETS)
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
    const connectiondb = await conn.getConnection();
    const pets = await connectiondb
                        .db(DATABASE)
                        .collection(PETS)
                        .find({
                            province: "Santa Fe" 
                          })
                        .toArray(); 
    return pets;
}

//http://localhost:3000/api/pets/searchPetsByProvinceCordoba
async function getPetsByProvinceCordoba(){
    const connectiondb = await conn.getConnection();
    const pets = await connectiondb
                        .db(DATABASE)
                        .collection(PETS)
                        .find({
                            province: "Cordoba"
                          })
                        .toArray(); 
    return pets;
}

//http://localhost:3000/api/pets/addPet
// Función para crear una mascota
async function addPet(pet) {
  const connectiondb = await conn.getConnection();
  const result = await connectiondb
    .db(DATABASE)
    .collection(PETS)
    .insertOne(pet);
  return result;
}

// http://localhost:3000/api/pets/updatePet/654d24c88350cd054198ccc3
// Función para crear una mascota
async function updatePet(id, pet) {
  const connectiondb = await conn.getConnection();
  const filter = { _id:new ObjectId(id) }; 
  const update = { $set: pet };
  const result = connectiondb
    .db(DATABASE)
    .collection(PETS)
    .findOneAndUpdate(filter, update, { returnOriginal: false });

  return result;
}

// Función para robar una mascota
// http://localhost:3000/api/pets/654d24c88350cd054198ccc3
async function deletePet(id) {
    const connectiondb = await conn.getConnection();
    const filter = { _id:new ObjectId(id) }; 
    const result = connectiondb
    .db(DATABASE)
    .collection(PETS)
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
    deletePet
};