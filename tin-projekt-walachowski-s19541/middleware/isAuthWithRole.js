const jwt = require("jsonwebtoken");
const config = require("../config/auth/key");

module.exports = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	console.log("================");
	rentId = req._parsedUrl["path"].replace("/", "");
	console.log(rentId);
	if (token == null) {
		return res.sendStatus(401);
	}
	jwt.verify(token, config.secret, (err, user) => {
		if (err) {
			return res.sendStatus(403);
		}
		req.user = user;
		console.log("================================");
		console.log(user);
		console.log("================================");
	});
	next();
};
