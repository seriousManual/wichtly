var mongoose = require('mongoose');

mongoose.connect('mongodb://pi/test');

var db = mongoose.connection;

db.on('error', function(error) {
    console.log('connection error:' + error.message);
});

module.exports = db;