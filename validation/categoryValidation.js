const Joi = require('joi');

const categoryValidator = (schema) => (payload) => schema.validate(payload, { abortEarly: false })

const categorySchema = Joi.object({
    categoryName: Joi.string().required(),
}).unknown(true);

module.exports = categoryValidator(categorySchema)