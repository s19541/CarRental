const db = require('../../config/mysql2/db');
const rentSchema = require('../../model/joi/Rent');

exports.getRents = () => {
	return db.promise().query('SELECT * FROM Rent')
    .then( (results, fields) => {
        console.log(results[0]);
        return results[0];
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.getRentById = (rentId) => {
	const query = `SELECT r._id as _id, r.data_wynajmu, r.data_zwrotu, r.przejechany_dystans, car._id as car_id,
        car.model, car.marka, car.cena_za_kilometr, car.cena_za_godzine, car.kaucja, client._id as client_id, client.imie, client.nazwisko 
    FROM Rent r
    left join Car car on car._id = r.car_id
    left join Client client on client._id = r.client_id 
    where r._id = ?`
return db.promise().query(query, [rentId])
        .then( (results, fields) => {
            const row = results[0][0];
            if(!row) {
                return {};
            }
            const rent = {
                _id: rentId,
                data_wynajmu: row.data_wynajmu,
                data_zwrotu: row.data_zwrotu,
                przejechany_dystans: row.przejechany_dystans,
                car: {
                    _id: row.car_id,
                    marka: row.marka,
                    model: row.model,
					cena_za_godzine: row.cena_za_godzine,
					cena_za_kilometr: row.cena_za_kilometr,
					kaucja: row.kaucja
                },
                client: {
                    _id: row.client_id,
                    imie: row.imie,
                    nazwisko: row.nazwisko
                }
            };
            console.log(rent);
            return rent;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createRent = (data) => {
    const vRes = rentSchema.validate(data, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    console.log('createRent');
    console.log(data);
    data.data_zwrotu = data.data_zwrotu ? data.data_zwrotu : null;
    const sql = 'INSERT into Rent (data_wynajmu, data_zwrotu, przejechany_dystans, car_id, client_id) VALUES (DATE_ADD(?, INTERVAL 1 DAY), DATE_ADD(?, INTERVAL 1 DAY), ?, ?, ?)';
    return db.promise().execute(sql, [data.data_wynajmu, data.data_zwrotu, data.przejechany_dystans, data.car_id, data.client_id]);
};

exports.updateRent = (rentId, data) => {
    const vRes = rentSchema.validate(data, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    data.data_zwrotu = data.data_zwrotu ? data.data_zwrotu : null;
    const sql = `UPDATE Rent set data_wynajmu = DATE_ADD(?, INTERVAL 1 DAY) , data_zwrotu = DATE_ADD(?, INTERVAL 1 DAY), przejechany_dystans = ? , car_id = ?, client_id = ? where _id = ?`;
    return db.promise().execute(sql, [data.data_wynajmu, data.data_zwrotu, data.przejechany_dystans, data.car_id, data.client_id, rentId]);
}

exports.deleteRent = (rentId) => {
    const sql = 'DELETE FROM Rent where _id = ?'
    return db.promise().execute(sql, [rentId]);
}