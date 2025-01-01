const Joi = require('joi');

const authorValidator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });

const authorSchema = Joi.object({
    authorName: Joi.string().required(),
}).unknown(true);

module.exports = authorValidator(authorSchema);