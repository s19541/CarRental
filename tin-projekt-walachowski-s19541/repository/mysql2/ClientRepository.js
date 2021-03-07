const db = require("../../config/mysql2/db");
const clientSchema = require("../../model/joi/Client");

exports.getClients = () => {
	return db
		.promise()
		.query("SELECT * FROM Client")
		.then((results, fields) => {
			console.log(results[0]);
			return results[0];
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};

exports.getClientById = (clientId) => {
	const query = `SELECT c._id as _id, c.imie, c.nazwisko, c.login, c.haslo, c.rola, rent._id as rent_id,
        rent.data_wynajmu, rent.data_zwrotu, rent.przejechany_dystans, car._id as car_id, car.model, car.marka, car.cena_za_godzine, car.cena_za_kilometr, car.kaucja
    FROM Client c
    left join Rent rent on rent.client_id = c._id
    left join Car car on rent.car_id = car._id 
    where c._id = ?`;
	return db
		.promise()
		.query(query, [clientId])
		.then((results, fields) => {
			const firstRow = results[0][0];
			if (!firstRow) {
				return {};
			}
			const client = {
				_id: parseInt(clientId),
				imie: firstRow.imie,
				nazwisko: firstRow.nazwisko,
				login: firstRow.login,
				haslo: firstRow.haslo,
				rola: firstRow.rola,
				rents: [],
			};
			for (let i = 0; i < results[0].length; i++) {
				const row = results[0][i];
				if (row.rent_id) {
					const rent = {
						_id: row.rent_id,
						data_wynajmu: row.data_wynajmu,
						data_zwrotu: row.data_zwrotu,
						przejechany_dystans: row.przejechany_dystans,
						car: {
							_id: row.car_id,
							model: row.model,
							marka: row.marka,
							cena_za_godzine: parseInt(row.cena_za_godzine),
							cena_za_kilometr: parseInt(row.cena_za_kilometr),
							kaucja: parseInt(row.kaucja),
						},
					};
					client.rents.push(rent);
				}
			}
			return client;
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};

exports.createClient = (newClientData) => {
	newClientData.rola = newClientData.rola ? newClientData.rola : "user";
	const vRes = clientSchema.validate(newClientData, { abortEarly: false });
	if (vRes.error) {
		console.log(vRes.error);
		return Promise.reject(vRes.error);
	}
	return checkLoginUnique(newClientData.login).then((loginErr) => {
		if (loginErr != null) {
			return Promise.reject(loginErr);
		} else {
			const imie = newClientData.imie;
			const nazwisko = newClientData.nazwisko;
			const login = newClientData.login;
			const haslo = newClientData.haslo;
			const rola = newClientData.rola;
			const authUtil = require("../../util/authUtils");
			const passHash = authUtil.hashPassword(haslo);
			const sql =
				"INSERT into Client (imie, nazwisko, login, haslo, rola) VALUES (?, ?, ?, ?, ?)";
			return db.promise().execute(sql, [imie, nazwisko, login, passHash, rola]);
		}
	});
};

exports.updateClient = (clientId, clientData) => {
	const vRes = clientSchema.validate(clientData, { abortEarly: false });
	console.log(vRes.error);
	if (vRes.error && vRes.error.message.includes("Pole")) {
		console.log(vRes.error);
		return Promise.reject(vRes.error);
	}
	const imie = clientData.imie;
	const nazwisko = clientData.nazwisko;
	const rola = clientData.rola;
	//const login = clientData.login;
	//const haslo = clientData.haslo;
	//const authUtil = require('../../util/authUtils');
	//const passHash = authUtil.hashPassword(haslo);
	const sql = `UPDATE Client set imie = ?, nazwisko = ?, rola = ? where _id = ?`;
	return db.promise().execute(sql, [imie, nazwisko, rola, clientId]);
};

exports.deleteClient = (clientId) => {
	const sql1 = "DELETE FROM Rent where client_id = ?";
	const sql2 = "DELETE FROM Client where _id = ?";

	return db
		.promise()
		.execute(sql1, [clientId])
		.then(() => {
			return db.promise().execute(sql2, [clientId]);
		});
};
exports.findByLogin = (login) => {
	const query = `SELECT c._id, c.imie, c.nazwisko, c.login, c.haslo FROM Client c
    where c.login = ?`;
	return db
		.promise()
		.query(query, [login])
		.then((results, fields) => {
			const firstRow = results[0][0];
			if (!firstRow) {
				return {};
			}
			const client = {
				_id: firstRow._id,
				imie: firstRow.imie,
				nazwisko: firstRow.nazwisko,
				login: login,
				haslo: firstRow.haslo,
			};
			return client;
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};
checkLoginUnique = (login, clientId) => {
	let sql, promise;
	if (clientId) {
		sql = `SELECT COUNT(1) as c FROM Client where _id != ? and login = ?`;
		promise = db.promise().query(sql, [clientId, login]);
	} else {
		sql = `SELECT COUNT(1) as c FROM Client where login = ?`;
		promise = db.promise().query(sql, [login]);
	}
	return promise.then((results, fields) => {
		const count = results[0][0].c;
		let err = {};
		if (count > 0) {
			err = {
				details: [
					{
						path: ["login"],
						message: "Podany login jest zajęty",
					},
				],
			};
			return err;
		}
		return null;
	});
};
