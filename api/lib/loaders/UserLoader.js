var User = require('../models/User').model;

function UserLoader() {
}

UserLoader.prototype.loginUser = function (mail, password, callback) {
    User.findOne({mail: mail, password: password}).exec(function (error, result) {
        if (error) return callback(error, null);

        if (!result) return callback(null, null);

        return callback(null, result);
    });
};

UserLoader.prototype.loadUserByMail = function(mail, callback) {
    User.findOne({mail: mail}).exec(function (error, result) {
        if (error) return callback(error, null);

        if (!result) return callback(null, null);

        return callback(null, result);
    });
};

UserLoader.prototype.loadUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports = UserLoader;