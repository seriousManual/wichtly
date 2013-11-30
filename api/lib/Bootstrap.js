var seq = require('seq');

var configuration = require('./configuration');
var connection = require('./connection');

var TokenHandler = require('./authorization/TokenHandler');
var UserLoader = require('./authorization/UserLoader');
var WishLoader = require('./WishLoader');
var Authorizationmiddleware = require('../middlewares/authorization');

var authorizeRoute = require('./routes/authorize');
var wishRoute = require('./routes/wish');
var errors = require('./errors');

module.exports = function(app, callback) {
    seq()
            .seq('connection', function() {
                connection(this);
            })
            .seq(function() {
                install(app, this.vars.connection, this);
            })
            .seq(callback)
            .catch(callback);
};

function install(app, connection, callback) {
    var tokenHandler = new TokenHandler(configuration.authorization.secret);
    var userLoader = new UserLoader();
    var wishLoader = new WishLoader();
    var authorizationMiddleware = Authorizationmiddleware(tokenHandler);

    authorizeRoute(app, tokenHandler, userLoader);
    wishRoute(app, authorizationMiddleware, wishLoader);

    app.use(function errorHandler(error, req, res, next) {
        if(!error.statusCode || !error.message) {
            console.log( error );
            error = new errors.InternalServerError();
        }

        res.send(error.statusCode, {message: error.message});
    });

    callback(null);
}