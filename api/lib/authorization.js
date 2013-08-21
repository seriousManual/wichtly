var User = require('./models/User');

function Authorizor() {}

Authorizor.prototype.isAuthorized = function(req) {
    if(req.session && req.session.authorized) {
        return true;
    }

    return false;
};

Authorizor.prototype.authorize = function(req, callback) {
    var _name, _pwd;

    if(req.query && req.query.userName && req.query.password) {
        _name = req.query.userName;
        _pwd = req.query.password;

        User.find({name: _name, password: _pwd}).exec(function(error, result) {
            console.log( result );
            if (error || result.length == 0) {
                return callback(null, false);
            }

            req.session.authorized = true;
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