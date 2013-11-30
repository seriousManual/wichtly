var errors = require('../lib/errors');

module.exports = function (tokenHandler) {
    return function authorization(req, res, next) {
        var authToken = req.headers.wichtlyauth;

        if (!authToken) {
            next(new errors.Unauthorized());
        }

        if (tokenHandler.validate(authToken)) {
            //TODO: add user id to req
            return next();
        }

        next(new errors.Unauthorized());
    }
};