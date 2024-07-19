const Joi = require('joi');

function Validate(xabar, method) {
    const sxema1 = Joi.object({
        name: Joi.string().min(1).max(50).required(),
        path: Joi.string().min(1).max(50).required(),
        description: Joi.string().min(0).max(450)
    });
    const sxema2 = Joi.object({
        name: Joi.string().min(1).max(50),
        path: Joi.string().min(1).max(50),
        description: Joi.string().min(0).max(450)
    });

    if (method == 'add')
        return sxema1.validate(xabar);


    return sxema2.validate(xabar);
}

module.exports = Validate;