const Joi = require('joi');

function Validate(xabar, method) {
    const sxema1 = Joi.object({
        name: Joi.string().min(1).max(50).required(),
        tasks: Joi.string().min(0).max(1500)
    });
    const sxema2 = Joi.object({
        name: Joi.string().min(1).max(50),
        tasks: Joi.string().min(0).max(1500)
    });

    if (method == 'add')
        return sxema1.validate(xabar);


    return sxema2.validate(xabar);
}

module.exports = Validate;