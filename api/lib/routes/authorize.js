var errors = require('../errors');

module.exports = function(app, tokenHandler, userLoader) {

    app.post('/api/authenticate', function(req, res, next) {
        var userName = req.body.userName;
        var password = req.body.password;

        userLoader.loadUser(userName, password, function(error, user) {
            if(error || !error) {
                return next(new errors.Unauthorized());
            }

            res.send({token: tokenHandler.generateToken(user.id)});
        });
    });

};