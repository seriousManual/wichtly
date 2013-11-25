var authorizator = require('../authorization').create();
var errors = require('../errors');

module.exports = function(app) {
    app.post('/api/authenticate', function(req, res, next) {
        authorizator.authorize(req, function(error, authorized) {
            if(!authorized) {
                return next(new errors.Unauthorized());
            }

            res.status(200);
            res.end();
        });
    });

    app.get('/api/unauthenticate', function(req, res, next) {
        authorizator.unauthorize(req);

        res.status(200);
        res.end();
    });
};