const ClientRepository = require("../repository/mysql2/ClientRepository");
const config = require("../config/auth/key");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
	const login = req.body.login;
	const haslo = req.body.haslo;
	ClientRepository.findByLogin(login).then((user) => {
		if (!user) {
			return res
				.status(401)
				.send({ message: "Nieprawidłowy login lub hasło!" });
		}

		bcrypt
			.compare(haslo, user.haslo)
			.then((isEqual) => {
				if (!isEqual) {
					return res
						.status(401)
						.send({ message: "Nieprawidłowy login lub hasło!" });
				}
				const token = jwt.sign(
					{
						login: user.login,
						userId: user._id,
					},
					config.secret,
					{ expiresIn: "1h" }
				);
				res.status(200).json({ token: token, userId: user._id });
			})
			.catch((err) => {
				console.log(err);
				res.status(501);
			});
	});
};
