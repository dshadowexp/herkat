import Joi from "joi"

const daysSchema = Joi.string().valid('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun').required();

export const validateCreateAvailabilitiesRequest = (body: object) => {
    const schema = Joi.object({
        day: daysSchema,
        startTime: Joi.string().required(),
        endTime: Joi.string().required()
    });

    return schema.validate(body);
}