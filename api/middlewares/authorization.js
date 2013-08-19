var errors = require('../lib/errors');
var authoritator = require('../lib/authorization').create();

function authorization(req, res, next) {
    if(authoritator.isAuthorized(req)) {
        return next();
    }

    next(new errors.Unauthorized());
}

module.exports = authorization;