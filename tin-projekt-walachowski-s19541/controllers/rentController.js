const RentRepository = require('../repository/mysql2/RentRepository');
const CarRepository = require('../repository/mysql2/CarRepository');
const ClientRepository = require('../repository/mysql2/ClientRepository');

exports.showRentList = (req, res, next) => {
    let allCars, allClients;
    CarRepository.getCars()
        .then(cars => {
            allCars = cars;
            return ClientRepository.getClients();
        })
        .then(clients => {
            allClients = clients;
            return RentRepository.getRents()
        })
        .then(rents => {
            res.render('pages/rent/list', {
                rents: rents,
                allCars: allCars,
                allClients: allClients,
                navLocation: 'rent'
            });
        });
    }
exports.showAddRentForm = (req, res, next) => {
    let allCars, allClients;
    CarRepository.getCars()
        .then(cars => {
            allCars = cars;
            return ClientRepository.getClients();
        })
        .then(clients => {
            allClients = clients;
            res.render('pages/rent/form', {
                rent: {},
                formMode: 'createNew',
                allCars: allCars,
                allClients: allClients,
                pageTitle: req.__('rent.form.add.pageTitle'),
                btnLabel: req.__('rent.form.add.btnLabel'),
                formAction: '/rents/add',
                navLocation: 'rent',
                validationErrors: null
            });
        });
}
exports.showRentDetails = (req, res, next) => {
    let allCars, allClients;
    const rentId = req.params.rentId;
    CarRepository.getCars()
        .then(cars => {
            allCars = cars;
            return ClientRepository.getClients();
        })
        .then(clients => {
            allClients = clients;
            return RentRepository.getRentById(rentId);
        })
        .then(rent => {
            res.render('pages/rent/form', {
                rent: rent,
                allCars: allCars,
                allClients: allClients,
                formMode: 'showDetails',
                pageTitle: req.__('rent.form.details.pageTitle'),
                formAction: '',
                navLocation: 'rent',
                validationErrors: null
            });
        });
}
exports.showRentEdit = (req, res, next) => {
    let allCars, allClients;
    const rentId = req.params.rentId;
    CarRepository.getCars()
        .then(cars => {
            allCars = cars;
            return ClientRepository.getClients();
        })
        .then(clients => {
            allClients = clients;
            return RentRepository.getRentById(rentId);
        })
        .then(rent => {
            res.render('pages/rent/form', {
                rent:rent,
                allCars: allCars,
                allClients: allClients,
                formMode: 'edit',
                pageTitle: req.__('rent.form.edit.pageTitle'),
                btnLabel: req.__('rent.form.edit.btnLabel'),
                formAction: '/rents/edit',
                navLocation: 'rent',
                validationErrors: null
            });
        });
}
exports.addRent = (req, res, next) => {
    const rentData = { ...req.body };
    RentRepository.createRent(rentData)
        .then( result => {
            res.redirect('/rents');
        }).catch(err => {
            let allCars, allClients;
            CarRepository.getCars()
        .then(cars => {
            allCars = cars;
            return ClientRepository.getClients();
        })
        .then(clients => {
            allClients = clients;
            res.render('pages/rent/form', {
                rent: rentData,
                allCars: allCars,
                allClients: allClients,
                pageTitle: req.__('rent.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('rent.form.add.btnLabel'),
                formAction: '/rents/add',
                navLocation: 'rent',
                validationErrors: err.details
            });
        });
        });
};

exports.updateRent = (req, res, next) => {
    const rentId = req.body._id;
    const rentData = { ...req.body };
    RentRepository.updateRent(rentId, rentData)
        .then( result => {
            res.redirect('/rents');
        }).catch(err => {
            let allCars, allClients;
            CarRepository.getCars()
        .then(cars => {
            allCars = cars;
            return ClientRepository.getClients();
        })
        .then(clients => {
            allClients = clients;
            res.render('pages/rent/form', {
                rent: rentData,
                allCars: allCars,
                allClients: allClients,
                pageTitle: req.__('rent.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('rent.form.edit.btnLabel'),
                formAction: '/rents/edit',
                navLocation: 'rent',
                validationErrors: err.details
            });
        });
        }); 
};

exports.deleteRent = (req, res, next) => {
    const rentId = req.params.rentId;
    RentRepository.deleteRent(rentId)
    .then( () => {
        res.redirect('/rents');
    });
};