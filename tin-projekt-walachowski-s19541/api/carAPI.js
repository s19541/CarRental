const CarRepository = require('../repository/mysql2/CarRepository');

exports.getCars = (req, res, next) => {
    CarRepository.getCars()
        .then(cars => {
            res.status(200).json(cars);
        })
        .catch(err => {
           console.log(err);
        });
};

exports.getCarById = (req, res, next) => {
    const carId = req.params.carId;
    CarRepository.getCarById(carId)
        .then(car => {
            if(!car) {
                res.status(404).json({
                    message: 'Car with id: '+carId+' not found'
                })
            } else {
                res.status(200).json(car);
            }
        });
};

exports.createCar = (req, res, next) => {
    CarRepository.createCar(req.body)
        .then(newObj => {
           res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateCar = (req, res, next) => {
    const carId = req.params.carId;
    CarRepository.updateCar(carId, req.body)
        .then(result => {
           res.status(200).json({message: 'Car updated!', car: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteCar = (req, res, next) => {
    const carId = req.params.carId;
    CarRepository.deleteCar(carId)
        .then(result => {
            res.status(200).json({message: 'Removed car', car: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};