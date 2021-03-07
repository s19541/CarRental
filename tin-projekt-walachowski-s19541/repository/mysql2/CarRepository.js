const db = require('../../config/mysql2/db');
const carSchema = require('../../model/joi/Car');

exports.getCars = () => {
	return db.promise().query('SELECT * FROM Car')
    .then( (results, fields) => {
        console.log(results[0]);
        return results[0];
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.getCarById = (carId) => {
	const query = `SELECT c._id as _id, c.model, c.marka, c.cena_za_godzine, c.cena_za_kilometr, c.kaucja, rent._id as rent_id,
        rent.data_wynajmu, rent.data_zwrotu, rent.przejechany_dystans, client._id as client_id, client.imie, client.nazwisko 
    FROM Car c
    left join Rent rent on rent.car_id = c._id
    left join Client client on rent.client_id = client._id 
    where c._id = ?`
return db.promise().query(query, [carId])
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return {};
        }
        const car = {
            _id: parseInt(carId),
            model: firstRow.model,
            marka: firstRow.marka,
            cena_za_godzine: parseInt(firstRow.cena_za_godzine),
			cena_za_kilometr: parseInt(firstRow.cena_za_kilometr),
			kaucja: parseInt(firstRow.kaucja),
            rents: []
        }
        for( let i=0; i<results[0].length; i++ ) {
            const row = results[0][i];
            if(row.rent_id) {
                const rent = {
                    _id: row.rent_id,
                    data_wynajmu: row.data_wynajmu,
                    data_zwrotu: row.data_zwrotu,
                    przejechany_dystans: row.przejechany_dystans,
                    client: {
                        _id: row.client_id,
                        imie: row.imie,
                        nazwisko: row.nazwisko
                    }
                };
                car.rents.push(rent);
            }
        }
        return car;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.createCar = (newCarData) => {
    const vRes = carSchema.validate(newCarData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
   /* return checkModelUnique(newCarData.marka, newCarData.model)
        .then(modelErr => {
            if(modelErr!=null) {
                return Promise.reject(modelErr);
            } else {*/
	const model = newCarData.model;
	const marka = newCarData.marka;
	const cena_za_godzine = newCarData.cena_za_godzine;
	const cena_za_kilometr = newCarData.cena_za_kilometr;
    const kaucja = newCarData.kaucja;
	const sql = 'INSERT into Car (model, marka, cena_za_godzine, cena_za_kilometr, kaucja) VALUES (?, ?, ?, ?, ?)'
    return db.promise().execute(sql, [model, marka, cena_za_godzine, cena_za_kilometr, kaucja]);
   // }
    //});
};

exports.updateCar = (carId, carData) => {
    const vRes = carSchema.validate(carData, { abortEarly: false} );
    if(vRes.error) {
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        console.log(vRes.error);
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxx");
        return Promise.reject(vRes.error);
    }
   /* return checkModelUnique(carData.marka, carData.model, carId)
        .then(modelErr => {
            if(modelErr!=null) {
                return Promise.reject(modelErr);
            } else {*/
    const marka = carData.marka;
    const model = carData.model;
	const cena_za_godzine = carData.cena_za_godzine;
	const cena_za_kilometr = carData.cena_za_kilometr;
	const kaucja = carData.kaucja;
	const sql = `UPDATE Car set marka = ?, model = ?, cena_za_godzine = ?, cena_za_kilometr= ?, kaucja = ? where _id = ?`;
    return db.promise().execute(sql, [marka, model, cena_za_godzine, cena_za_kilometr, kaucja, carId]);
   // }
    //});
};

exports.deleteCar = (carId) => {
	const sql1 = 'DELETE FROM Rent where car_id = ?'
	const sql2 = 'DELETE FROM Car where _id = ?'

	return db.promise().execute(sql1, [carId])
    .then(() => {
        return db.promise().execute(sql2, [carId])
    });
};
checkModelUnique = (marka, model, carId) => {
    let sql, promise;
    if(carId) {
        sql = `SELECT COUNT(1) as c FROM Car where _id != ? and marka = ? and model = ?`;
        promise = db.promise().query(sql, [carId, marka, model]);
    } else {
        sql = `SELECT COUNT(1) as c FROM Car where marka = ? and model = ?`;
        promise = db.promise().query(sql, [marka, model]);
    }
    return promise.then( (results, fields) => {
        const count = results[0][0].c;
        let err = {};
        if(count > 0) {
            err = {
                details: [{
                    path: ['model'],
                    message: 'Podany pojazd nie jest unikalny'
                }]
            };
            return err;
        }
        return null;
    });
}