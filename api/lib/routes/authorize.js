var errors = require('../errors');
var d = require('debug')('wichtly:authorize');

module.exports = function (app, tokenHandler, userLoader) {

    app.post('/api/authenticate', function (req, res, next) {
        var userName = req.body.userName;
        var password = req.body.password;

        d('credentials: %s, %s', userName, password);

        if (!userName || !password) {
            return next(new errors.BadRequestError('userName and/or password missing'));
        }

        userLoader.loadUser(userName, password, function (error, user) {
            if (error || !user) {
                d('failed');
                return next(new errors.Unauthorized());
            }

            var token = tokenHandler.generateToken(user._id);

            d('success: %s', token);

            res.send({token:token});
        });
    });

};