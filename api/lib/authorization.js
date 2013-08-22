var User = require('./models/User');

function Authorizor() {}

Authorizor.prototype.isAuthorized = function(req) {
    if(req.session && req.session.user) {
        return true;
    }

    return false;
};

Authorizor.prototype.authorize = function(req, callback) {
    var _name, _pwd;

    console.log( req.query, req.body );

    if(req.body && req.body.userName && req.body.password) {
        _name = req.body.userName;
        _pwd = req.body.password;

        User.findOne({name: _name, password: _pwd}).exec(function(error, result) {
            if (error || !result) {
                return callback(null, false);
            }

            req.session.user = result;

            return callback(null, true);
        });
    } else {
        return callback(null, false);
    }
};

var instance = null;

module.exports.create = function() {
    if(instance === null) {
        instance = new Authorizor();
    }

    return instance;
};