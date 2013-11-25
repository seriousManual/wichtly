var mongoose = require('mongoose');

var configuration = require('./configuration');

var db = mongoose.createConnection(configuration.database.host, configuration.database.database, configuration.database.port);

db.on('error', function(error) {
    console.log('connection error:' + error.message);
});

module.exports = db;