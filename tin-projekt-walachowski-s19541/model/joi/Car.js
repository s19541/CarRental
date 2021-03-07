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
            case "number.max":
                err.message = `Wartość pola nie może być większa niż ${err.local.limit}`;
                break;      
            default:
                break;
        }
    });
    return errors;
}
const carSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    model: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    marka: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    cena_za_godzine: Joi.number()
        .min(10)
        .max(500)
        .required()
        .error(errMessages),
    cena_za_kilometr: Joi.number()
        .min(10)
        .max(200)
        .required()
        .error(errMessages),
    kaucja: Joi.number()
        .required()
        .min(0)
        .error(errMessages),
    rents: Joi.array()

});
module.exports = carSchema;