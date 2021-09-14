const Joi = require("joi");

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        username: Joi.string().min(5).max(20).required(),
        email: Joi.string().min(15).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        shoeSize: Joi.number().min(1).required(),
    });
    return schema.validate(user);
}

module.exports = {
    validateUser,
};
