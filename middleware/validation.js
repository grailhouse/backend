const Joi = require("joi");

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().max(15).required(),
        email: Joi.string().min(5).max(40).required().email(),
        password: Joi.string().min(5).max(15).required(),
    });
    return schema.validate(user);
}

module.exports = {
    validateUser,
};
