const Joi = require("joi");

const authValidator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  repeatPassword: Joi.string().valid(Joi.ref("password")).required(),
}).unknown(true);

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).unknown(true);

module.exports = {
  validateRegister: authValidator(registerSchema),
  validateLogin: authValidator(loginSchema),
};
