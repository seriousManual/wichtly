var seq = require('seq');
var debug = require('debug');

var configuration = require('./configuration');
var logger = require('./logger');
var connection = require('./connection');

var TokenHandler = require('./authorization/TokenHandler');
var UserLoader = require('./loaders/UserLoader');
var WishLoader = require('./loaders/WishLoader');
var OrganisationLoader = require('./loaders/OrganisationLoader');
var LoggingService = require('./loggingService');
var Authorizationmiddleware = require('../middlewares/authorization');
var InitMidleware = require('../middlewares/init');

var authorizeRoute = require('./routes/authorize');
var wishRoute = require('./routes/wish');
var organisationRoute = require('./routes/organisation');
var errors = require('./errors');
var d = debug('wichtly:errorhandler');

module.exports = function (app, callback) {
    seq()
        .seq(function () {
            connection(this);
        })
        .seq(function () {
            install(app, this);
        })
        .seq(callback)
        .catch(callback);
};

function install(app, callback) {
    var tokenHandler = new TokenHandler(configuration.authorization.secret);
    var userLoader = new UserLoader();
    var wishLoader = new WishLoader(userLoader);
    var organisationLoader = new OrganisationLoader();
    var loggingService = new LoggingService();
    var authorizationMiddleware = Authorizationmiddleware(tokenHandler, userLoader);

    app.use(InitMidleware());

    authorizeRoute(app, tokenHandler, userLoader);
    wishRoute(app, authorizationMiddleware, wishLoader, loggingService);
    organisationRoute(app, authorizationMiddleware, organisationLoader);

    app.use(function errorHandler(error, req, res, next) {
        d('error encountered: %s', error.message);
        d(error);

        logger.error({mod: 'errorHandler', evt: 'error', mssg: error.message});

        if (!error.statusCode || !error.message) {
            error = new errors.InternalServerError();
        }

        res.send(error.statusCode, {message: error.message});
    });

    callback(null);
}