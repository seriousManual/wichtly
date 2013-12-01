var errors = require('../lib/errors');

module.exports = function (tokenHandler) {
    var authorization = function (req, res, next) {
        validate(req, tokenHandler, function (error, validated) {
            if (error) return next(error);

            req.WICHTLY.user = validated.userId;

            next();
        });
    };

    authorization.sameUser = function (req, res, next) {
        var targetedUser = req.params.userId;

        validate(req, tokenHandler, function (error, validated) {
            if (error) return next(error);

            if (targetedUser !== validated.userId) {
                return next(new errors.Unauthorized('not your domain'));
            }

            req.WICHTLY.user = validated.userId;

            next();
        });
    };

    return authorization;
};

function validate(req, tokenHandler, callback) {
    var authToken = req.headers.wichtlyauth;

    if (!authToken) {
        return callback(new errors.Unauthorized());
    }

    var validated = tokenHandler.validate(authToken);
    if (validated) {
        return callback(null, validated);
    }

    callback(new errors.Unauthorized());
}