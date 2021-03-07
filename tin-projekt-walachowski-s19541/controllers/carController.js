const CarRepository = require('../repository/mysql2/CarRepository');

exports.showCarList = (req, res, next) => {
    CarRepository.getCars()
        .then(cars => {
            res.render('pages/car/list', {
                cars: cars,
                navLocation: 'car'
            });
        });
    }
exports.showAddCarForm = (req, res, next) => {
     res.render('pages/car/form', {
        car: {},
        pageTitle: req.__('car.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('car.form.add.btnLabel'),
        formAction: '/cars/add',
        navLocation: 'car',
        validationErrors: null
    });
}
exports.showCarDetails = (req, res, next) => {
    const carId = req.params.carId;
    CarRepository.getCarById(carId)
        .then(car => {
            res.render('pages/car/form', {
                car: car,
                formMode: 'showDetails',
                pageTitle: req.__('car.form.details.pageTitle'),
                formAction: '',
                navLocation: 'car',
                validationErrors: null
            });
        });
}
exports.showCarEdit = (req, res, next) => {
    const carId = req.params.carId;
    CarRepository.getCarById(carId)
        .then(car => {
            res.render('pages/car/form', {
                car: car,
                formMode: 'edit',
                pageTitle: req.__('car.form.edit.pageTitle'),
                btnLabel: req.__('car.form.edit.btnLabel'),
                formAction: '/cars/edit',
                navLocation: 'car',
                validationErrors: null
            });
        });
}
exports.addCar = (req, res, next) => {
    const carData = { ...req.body };
    console.log(carData);
    CarRepository.createCar(carData)
        .then( result => {
            res.redirect('/cars');
        }).catch(err => {
            res.render('pages/car/form', {
                car: carData,
                pageTitle: req.__('car.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('car.form.add.btnLabel'),
                formAction: '/cars/add',
                navLocation: 'car',
                validationErrors: err.details
            });
        });
};

exports.updateCar = (req, res, next) => {
    const carId = req.body._id;
    const carData = { ...req.body };
    console.log(carData);
    CarRepository.updateCar(carId, carData)
        .then( result => {
            res.redirect('/cars');
        }).catch(err => {
            res.render('pages/car/form', {
                car: carData,
                formMode: 'edit',
                pageTitle: req.__('car.form.edit.pageTitle'),
                btnLabel: req.__('car.form.edit.btnLabel'),
                formAction: '/cars/edit',
                navLocation: 'car',
                validationErrors: err.details
        });
    }); 
};

exports.deleteCar = (req, res, next) => {
    const carId = req.params.carId;
    CarRepository.deleteCar(carId)
    .then( () => {
        res.redirect('/cars');
    });
};