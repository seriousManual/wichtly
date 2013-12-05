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
    process.exit(1);
});

connection.once('open', callback);

function callback() {
    var tmpUser1 = new User({userName: 'Manuel Ernst', mail:'mail@manuel-ernst.de', password: 'foobar'});
    var tmpUser2 = new User({userName: 'Miriam Ernst', mail:'miriam-ernst@rr93.de', password: 'asdf'});
    var tmpUser3 = new User({userName: 'Dominik Ernst', mail:'dominik.ernst@gmx.de', password: 'jkloe'});
    var tmpUser4 = new User({userName: 'Rita Ernst', mail:'rita@rr93.de', password: 'uuii14'});
    var tmpUser5 = new User({userName: 'Friedhelm Ernst', mail:'mail@friedhelmernst.de', password: 'zetee11'});

    var tmpOrganisation = new Organisation({name: 'fooOrganisation', creator: tmpUser1._id});

    tmpUser1.organisation = tmpOrganisation._id;
    tmpUser2.organisation = tmpOrganisation._id;
    tmpUser3.organisation = tmpOrganisation._id;
    tmpUser4.organisation = tmpOrganisation._id;
    tmpUser5.organisation = tmpOrganisation._id;

    seq()
        .seq(function() {
            console.log('removing Users');
            User.remove({}, this)
        })
        .seq(function() {
            console.log('removing Organisations');
            Organisation.remove({}, this)
        })
        .seq(function() {
            console.log('saving user1');
            tmpUser1.save(this);
        })
        .seq(function() {
            console.log('saving user2');
            tmpUser2.save(this);
        })
        .seq(function() {
            console.log('saving user3');
            tmpUser3.save(this);
        })
        .seq(function() {
            console.log('saving user4');
            tmpUser4.save(this);
        })
        .seq(function() {
            console.log('saving user5');
            tmpUser5.save(this);
        })
        .seq(function() {
            console.log('saving organisation');
            tmpOrganisation.save(this);
        })
        .seq(function() {
            tmpOrganisation.members.push(tmpUser1);
            tmpOrganisation.members.push(tmpUser2);
            tmpOrganisation.members.push(tmpUser3);
            tmpOrganisation.members.push(tmpUser4);
            tmpOrganisation.members.push(tmpUser5);

            console.log('saving organisation');
            tmpOrganisation.save(this);
        })
        .seq(end)
        .catch(end);
}

function end() {
    console.log('done!');

    process.exit(0);
}
