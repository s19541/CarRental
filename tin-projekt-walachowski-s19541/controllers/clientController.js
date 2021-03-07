const ClientRepository = require('../repository/mysql2/ClientRepository');

exports.showClientList = (req, res, next) => {
    ClientRepository.getClients()
        .then(clients => {
            res.render('pages/client/list', {
                clients: clients,
                navLocation: 'client'
            });
        });
    }
exports.showAddClientForm = (req, res, next) => {
    res.render('pages/client/form', {
        client: {},
        pageTitle: req.__('client.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('client.form.add.btnLabel'),
        formAction: '/clients/add',
        navLocation: 'client',
        validationErrors: null
    });
}
exports.showClientDetails = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.getClientById(clientId)
        .then(client => {
            res.render('pages/client/form', {
                client: client,
                formMode: 'showDetails',
                pageTitle: req.__('client.form.details.pageTitle'),
                formAction: '',
                navLocation: 'client',
                validationErrors: null
            });
        });
}
exports.showClientEdit = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.getClientById(clientId)
        .then(client => {
            res.render('pages/client/form', {
                client: client,
                formMode: 'edit',
                pageTitle: req.__('client.form.edit.pageTitle'),
                btnLabel: req.__('client.form.edit.btnLabel'),
                formAction: '/clients/edit',
                navLocation: 'client',
                validationErrors: null
            });
        });
}
exports.addClient = (req, res, next) => {
    const clientData = { ...req.body };
    ClientRepository.createClient(clientData)
        .then( result => {
            res.redirect('/clients');
        }).catch(err => {
            res.render('pages/client/form', {
                client: clientData,
                pageTitle: req.__('client.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('client.form.add.btnLabel'),
                formAction: '/clients/add',
                navLocation: 'client',
                validationErrors: err.details
            });
        });
};

exports.updateClient = (req, res, next) => {
    const clientId = req.body._id;
    const clientData = { ...req.body };
    ClientRepository.updateClient(clientId, clientData)
        .then( result => {
            res.redirect('/clients');
        }).catch(err => {
            res.render('pages/client/form', {
                client: clientData,
                formMode: 'edit',
                pageTitle: req.__('client.form.edit.pageTitle'),
                btnLabel: req.__('client.form.edit.btnLabel'),
                formAction: '/clients/edit',
                navLocation: 'client',
                validationErrors: err.details
        });
    }); 
};

exports.deleteClient = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.deleteClient(clientId)
    .then( () => {
        res.redirect('/clients');
    });
};