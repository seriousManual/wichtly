var util = require('util');

var mongoose = require('mongoose');

var configuration = require('./configuration');

module.exports = function(callback) {

    var uri;
    if(configuration.database.uri) {
        uri = configuration.database.uri;
    } else {
        uri = util.format('mongodb://%s:%s@%s:%d/%s', configuration.database.user, configuration.database.password, configuration.database.host, configuration.database.port, configuration.database.database);
    }

    mongoose.connect(uri);

    var connection = mongoose.connection;

    connection.on('error', function(error) {
        callback(error);
    });

    connection.once('open', callback);
};