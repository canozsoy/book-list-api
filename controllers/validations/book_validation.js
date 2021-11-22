const Joi = require('joi');

const bookValidationSchema = Joi.object({
    title: Joi.string()
        .alphanum()
        .max(100)
        .required(),
    author: Joi.string()
        .pattern(/[a-z]|[A-Z]/)
        .max(100)
        .required(),
    pages: Joi.number()
        .integer(),
    readInfo: Joi.boolean(),
    summary: Joi.string(),
});

module.exports = bookValidationSchema;