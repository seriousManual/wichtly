var mongoose = require('mongoose');

var configuration = require('./configuration');

module.exports = function(callback) {
    var db = mongoose.createConnection(configuration.database.host, configuration.database.database, configuration.database.port);

    db.on('error', function(error) {
        callback(error);
    });

    db.once('open', callback);
};