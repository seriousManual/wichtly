var configuration = require('./configuration');

var TokenHandler = require('./authorization/TokenHandler');
var UserLoader = require('./authorization/UserLoader');

var authorize = require('./routes/authorize');
var wish = require('./routes/wish');
var errors = require('./errors');

module.exports = function(app) {

    var tokenHandler = new TokenHandler(configuration.authorization.secret);
    var userLoader = new UserLoader();

    authorize(app, tokenHandler, userLoader);
    wish(app);

    app.use(function errorHandler(error, req, res, next) {
        if(!error.statusCode || !error.message) {
            error = new errors.InternalServerError();
        }

        res.send(error.statusCode, {message: error.message});
    });
};