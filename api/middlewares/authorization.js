var errors = require('../lib/errors');

module.exports = function(tokenHandler) {
    return function authorization(req, res, next) {
        var authToken = req.headers['wichtlyAuth'];

        if(tokenHandler.validate(authToken)) {
            return next();
        }

        next(new errors.Unauthorized());
    }
};