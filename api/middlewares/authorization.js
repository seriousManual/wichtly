var errors = require('../lib/errors');

module.exports = function (tokenHandler) {
    return function authorization(req, res, next) {
        var authToken = req.headers.wichtlyauth;

        if (!authToken) {
            return next(new errors.Unauthorized());
        }

        var validated = tokenHandler.validate(authToken);
        if (validated) {
            req.WICHTLY.user = validated.userId;

            return next();
        }

        next(new errors.Unauthorized());
    }
};