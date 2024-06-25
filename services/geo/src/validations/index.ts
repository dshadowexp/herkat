import Joi from 'joi';

export function validateCreateGeoRequest(body: object) {
    const schema = Joi.object({
        address: Joi.string().required(),
        country: Joi.string().allow('ca', 'us').required(),
    });

    return schema.validate(body);
}  