var logger = require('../logger');
var routeLogger = require('../../middlewares/routeLogger');
var errors = require('../errors');
var d = require('debug')('wichtly:authorize');

module.exports = function (app, tokenHandler, userLoader) {

    app.post('/api/authenticate', routeLogger('post', '/authenticate'), function (req, res, next) {
        var userName = req.body.userName;
        var password = req.body.password;

        d('credentials: %s, %s', userName, password);

        if (!userName || !password) {
            logger.warn({mod: 'authorize', evt: 'login', state: 'badRequest'});
            return next(new errors.BadRequestError('userName and/or password missing'));
        }

        userLoader.loginUser(userName, password, function (error, user) {
            if (error || !user) {
                d('failed');
                logger.warn({mod: 'authorize', evt: 'login', state: 'failed', userName: userName});

                return next(new errors.Unauthorized());
            }

            var token = tokenHandler.generateToken(user._id);

            d('success: %s', token);
            logger.info({mod: 'authorize', evt: 'login', state: 'success', userName: userName});

            res.send(200, {token: token, userId: user._id, organisation: user.organisation});
        });
    });

};