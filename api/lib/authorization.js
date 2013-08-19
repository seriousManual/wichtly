var users = {
    'a': {id: 1, password:'1'},
    'b': {id: 2, password:'2'}
};

function Authorizor() {

}

Authorizor.prototype.isAuthorized = function(req) {
    if(req.session && req.session.authorized) {
        return true;
    }

    return false;
};

Authorizor.prototype.authorize = function(req) {
    var _name, _pwd;

    if(req.query && req.query.userName && req.query.password) {
        _name = req.query.userName;
        _pwd = req.query.password;

        if(users[_name] && users[_name].password === _pwd) {
            req.session.authorized = users[_name].id;

            return true;
        }
    }

    return false;
};

var instance = null;

module.exports.create = function() {
    if(instance === null) {
        instance = new Authorizor();
    }

    return instance;
};