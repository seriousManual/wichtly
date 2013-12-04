var util = require('util');
var mongoose = require('mongoose');
var seq = require('seq');

var configuration = require('./api/lib/configuration');
var Organisation = require('./api/lib/models/Organisation').model;
var User = require('./api/lib/models/User').model;

var uri = util.format('mongodb://%s/%s', configuration.database.host, configuration.database.database);

mongoose.connect(uri, {
    user: configuration.database.user,
    pass: configuration.database.password
});

var connection = mongoose.connection;

connection.on('error', function(error) {
    console.log(error);
    process.exit();
});

connection.once('open', callback);

function callback() {
    var tmpUser1 = new User({userName: 'foo1', mail:'mail1', password: 'password1'});
    var tmpUser2 = new User({userName: 'foo2', mail:'mail2', password: 'password2'});
    var tmpUser3 = new User({userName: 'foo3', mail:'mail3', password: 'password3'});
    var tmpOrganisation = new Organisation({name: 'fooOrganisation', creator: tmpUser1._id});

    tmpUser1.organisation = tmpOrganisation._id;
    tmpUser2.organisation = tmpOrganisation._id;
    tmpUser3.organisation = tmpOrganisation._id;

    seq()
        .seq(function() {
            tmpUser1.save(this);
        })
        .seq(function() {
            tmpUser2.save(this);
        })
        .seq(function() {
            tmpUser3.save(this);
        })
        .seq(function() {
            tmpOrganisation.save(this);
        })
        .seq(function() {
            tmpOrganisation.members.push(tmpUser1);
            tmpOrganisation.members.push(tmpUser2);
            tmpOrganisation.members.push(tmpUser3);

            tmpOrganisation.save(this);
        })
        .seq(end)
        .catch(end);
}

function end() {
    console.log(arguments);

    process.exit();
}
