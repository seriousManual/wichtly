var User = require('../models/User');

function UserLoader() {}

UserLoader.prototype.loadUser = function(userName, password, callback) {
    User.findOne({userName: userName, password: password}).exec(function(error, result) {
        if (error) {
            return callback(error, null);
        }

        if(!result) {
            return callback(null, null);
        }

        return callback(null, result);
    });
};

module.exports = UserLoader;