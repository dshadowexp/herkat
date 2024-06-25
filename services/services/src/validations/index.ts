import Joi from 'joi';

export const validateCreateServiceRequest = (body: object) => {
    const schema = Joi.object({
        sid: Joi.string().required(),
        type: Joi.string().valid('trim', 'braid', 'color', 'treatment').required(),
        focus: Joi.string().valid('main', 'addon').required(),
        hairTypes: Joi.array().items(Joi.string().valid('straight', 'wavy', 'curly', 'coily', 'kinky')).required(),
        genders: Joi.array().items(Joi.string().valid('male', 'female')).required(),
        ages: Joi.array().items(Joi.string().valid('elderly', 'child', 'adult')).required(),
        sessions: Joi.array().items(Joi.string().valid('inoffice', 'inperson')).required(),
        duration: Joi.number().min(1).required(),
        price: Joi.number().min(1).required(),
        currency: Joi.string().valid('cad', 'usd').required()
    });

    return schema.validate(body);
} 