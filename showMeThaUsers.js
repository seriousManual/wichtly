var connection = require('./api/lib/connection');
var User = require('./api/lib/models/User');

User.find().limit(1).exec(function() {
    console.log( arguments );

    connection.close();
})