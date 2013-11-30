var util = require('util');

var mongoose = require('mongoose');

var configuration = require('./configuration');

module.exports = function(callback) {
    var uri = util.format('mongodb://%s/%s', configuration.database.host, configuration.database.database);

    mongoose.connect(uri, {
        user: configuration.database.user,
        pass: configuration.database.password
    });

    var connection = mongoose.connection;

    connection.on('error', function(error) {
        callback(error);
    });

    connection.once('open', callback);
};