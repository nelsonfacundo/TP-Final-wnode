const Joi = require("joi");

const petsSchema = Joi.object({
  name: Joi.string().max(12).required(),
  specie: Joi.string().required(),
  race: Joi.string().required(),
  gender: Joi.string().required(),
  age: Joi.number().required(),
  description: Joi.string().required(),
  province: Joi.string().required(),  
  status: Joi.string().valid("available", "adopted").optional()
});

function validatePets(pet) {
  const result = petsSchema.validate(pet);
  if (result.error) {
    throw new Error(result.error.details[0].message);
  }
  return result.value;
}

module.exports = { validatePets };