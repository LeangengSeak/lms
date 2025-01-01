const Joi = require('joi');

const bookValidator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });

const bookSchema = Joi.object({
    bookName: Joi.string().required(),
    author: Joi.number().required(),
    category: Joi.number().required()
}).unknown(true); // Allow unknown keys to pass validation

module.exports = bookValidator(bookSchema);