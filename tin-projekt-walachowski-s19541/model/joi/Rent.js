const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki`;
                break;
            case "number.base":
                err.message = "Pole jest wymagane";
                break;
            case "number.min":
                 err.message = `Wartość pola nie może być mniejsza niż ${err.local.limit}`;
                break;    
            case "date.base":
                err.message = `Pole jest wymagane`;
                break;
            case "date.max":
                err.message = `Data nie może być z przyszłości`;
                break;
            case "date.min":
                err.message = `Data zwrotu nie może być wcześniejsza niż data wynajmu`;
                break; 
            case "any.ref":
                err.message = `Data wynajmu jest wymagana`;
                break;              
            default:
                break;
        }
    });
    return errors;
}


const rentSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    client_id: Joi.number()
        .required()
        .error(errMessages),
    car_id: Joi.number()
        .required()
        .error(errMessages),
    data_wynajmu: Joi.date()
        .required()
        .max("now")
        .error(errMessages),
    data_zwrotu: Joi.date()
        .optional()
        .allow("")
        .min(Joi.ref('data_wynajmu'))
        .error(errMessages),
    przejechany_dystans: Joi.number()
        .required()
        .min(0)
        .error(errMessages)
});
module.exports = rentSchema;