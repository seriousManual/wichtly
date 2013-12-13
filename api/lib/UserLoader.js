var User = require('./models/User').model;

function UserLoader() {
}

UserLoader.prototype.loadUser = function (userName, password, callback) {
    User.findOne({userName: userName, password: password}).exec(function (error, result) {
        if (error) return callback(error, null);

        if (!result) return callback(null, null);

        return callback(null, result);
    });
};

UserLoader.prototype.loadUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports = UserLoader;