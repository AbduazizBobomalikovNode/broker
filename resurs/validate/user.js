const Joi = require('joi');

function Validate(xabar, method) {
    const sxema1 = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(5).max(35).required(),
        email: Joi.string().min(3).max(45).required(),
        password: Joi.string().min(6).max(150).required(),
        idrole: Joi.number().required(),
    });
    const sxema2 = Joi.object({
        name: Joi.string().min(3).max(50),
        phone: Joi.string().min(5).max(35),
        email: Joi.string().min(3).max(45),
        password: Joi.string().min(6).max(150),
        idrole: Joi.number(),
    });

    if (method == 'add')
        return sxema1.validate(xabar);


    return sxema2.validate(xabar);
}

module.exports = Validate;