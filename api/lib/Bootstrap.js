var seq = require('seq');
var debug = require('debug');

var configuration = require('./configuration');
var connection = require('./connection');

var TokenHandler = require('./authorization/TokenHandler');
var UserLoader = require('./authorization/UserLoader');
var WishLoader = require('./WishLoader');
var Authorizationmiddleware = require('../middlewares/authorization');

var authorizeRoute = require('./routes/authorize');
var wishRoute = require('./routes/wish');
var errors = require('./errors');
var d = debug('wichtly:errorhandler');

module.exports = function(app, callback) {
    seq()
            .seq(function() {
                connection(this);
            })
            .seq(function() {
                install(app, this);
            })
            .seq(callback)
            .catch(callback);
};

function install(app, callback) {
    var tokenHandler = new TokenHandler(configuration.authorization.secret);
    var userLoader = new UserLoader();
    var wishLoader = new WishLoader();
    var authorizationMiddleware = Authorizationmiddleware(tokenHandler);

    authorizeRoute(app, tokenHandler, userLoader);
    wishRoute(app, authorizationMiddleware, wishLoader);

    app.use(function errorHandler(error, req, res, next) {
        d('error encountered: %s', error.message);

        if(!error.statusCode || !error.message) {
            error = new errors.InternalServerError();
        }

        res.send(error.statusCode, {message: error.message});
    });

    callback(null);
}