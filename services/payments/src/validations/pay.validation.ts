import Joi from 'joi';

export const validateCreatePayRequest = (payload: object) => {
    const schema = Joi.object({
        orderId: Joi.string().required(),
        currency: Joi.string().valid('cad', 'usd').required(),
        amount: Joi.number().min(1).required(),
        paymentMethod: Joi.string().valid('card'),
        paymentMethodId: Joi.string(),
        destinationId: Joi.string().required(),
    });

    return schema.validate(payload);
}