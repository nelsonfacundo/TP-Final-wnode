const Joi = require("joi");

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().max(120).required(),
  roll: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

function validateUser(user) {
  const result = userSchema.validate(user);
  if (result.error) {
    throw new Error(result.error.details[0].message);
  }
  return result.value;
}

module.exports = { validateUser };
