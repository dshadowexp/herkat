import Joi from 'joi';

export const validateCreateAccountRequest = (payload: object) => {
    const schema = Joi.object({
        country: Joi.string().valid('CA', 'US').required(),
    });

    return schema.validate(payload);
}