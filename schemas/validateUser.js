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
	const result = userSchema.validate(user, { abortEarly: false });

	if (result.error) {
		const validationErrors = result.error.details.map(
			(detail) => detail.message
		);
		throw new Error(validationErrors.join(", "));
	}

	return result.value;
}

module.exports = { validateUser };
