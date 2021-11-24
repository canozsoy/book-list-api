const Joi = require('joi');

const postBookValidationSchema = Joi.object({
    title: Joi.string()
        .max(100)
        .required(),
    author: Joi.string()
        .max(100)
        .required(),
    pages: Joi.number()
        .integer(),
    readInfo: Joi.boolean(),
    summary: Joi.string(),
});

const putBookValidationSchema = postBookValidationSchema.keys({
    title: Joi.string()
        .max(100),
    author: Joi.string()
        .max(100),
})
    .min(1)
    .messages({
        'object.min': 'Req.body must have at least one key',
    });

module.exports = {
    postBookValidationSchema,
    putBookValidationSchema,
};
