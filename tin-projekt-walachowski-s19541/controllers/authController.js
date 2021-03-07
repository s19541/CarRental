const ClientRepository = require('../repository/mysql2/ClientRepository');
const authUtil = require('../util/authUtils')

exports.login = (req, res, next) => {
    const login = req.body.login;
    const haslo = req.body.haslo;
    ClientRepository.findByLogin(login)
        .then(client => {
            if(typeof(client.haslo)=='undefined') {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy login lub hasło"
                })
            } else if(authUtil.comparePasswords(haslo, client.haslo) === true) {
                req.session.loggedUser = client;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy login lub hasło"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}