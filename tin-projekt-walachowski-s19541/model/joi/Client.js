const Joi = require("joi");

const errMessages = (errors) => {
	errors.forEach((err) => {
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
			default:
				break;
		}
	});
	return errors;
};
const clientSchema = Joi.object({
	_id: Joi.number().optional().allow(""),
	imie: Joi.string().min(2).max(60).required().error(errMessages),
	nazwisko: Joi.string().min(2).max(60).required().error(errMessages),
	login: Joi.string().min(5).max(60).error(errMessages),
	haslo: Joi.string().min(5).max(60).error(errMessages),
	rola: Joi.string().max(10).error(errMessages),
});

module.exports = clientSchema;
