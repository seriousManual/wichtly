var errors = require('../lib/errors');

module.exports = function (tokenHandler, userLoader) {
    var authorization = function (req, res, next) {
        validate(req, function (error, user) {
            if (error) return next(error);

            req.WICHTLY.user = user;

            next();
        });
    };

    authorization.sameUser = function (req, res, next) {
        var targetedUser = req.params.userId;

        validate(req, function (error, user) {
            if (error) return next(error);

            if (targetedUser != user._id) {
                return next(new errors.Unauthorized('not your domain'));
            }

            req.WICHTLY.user = user;

            next();
        });
    };

    function validate(req, callback) {
        var authToken = req.headers.wichtlyauth;

        if (!authToken) {
            return callback(new errors.Unauthorized());
        }

        var validated = tokenHandler.validate(authToken);
        if (validated) {
            userLoader.loadUserById(validated.userId, function (error, user) {
                if (error) return callback(error);

                if (!user) return callback(new errors.Unauthorized());

                callback(null, user);
            });
        } else {
            callback(new errors.Unauthorized());
        }
    }

    return authorization;
};