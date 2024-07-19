const Joi = require('joi');

function Validate(xabar, method) {
    const sxema1 = Joi.object({
        idtopic: Joi.number().required(),
        iddevice: Joi.number().required(),
        subscribed:Joi.bool(),
        published :Joi.bool()
    });
    const sxema2 = Joi.object({
        subscribed:Joi.bool(),
        published :Joi.bool()
    });

    if (method == 'add')
        return sxema1.validate(xabar);


    return sxema2.validate(xabar);
}

module.exports = Validate;