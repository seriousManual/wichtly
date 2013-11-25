var path = require('path');

var express = require('express');
var browserify = require('connect-browserify');
var argv = require('optimist').argv;
var MongoStore = require('connect-mongo')(express);

var configuration = require('./api/lib/configuration');
var connection = require('./api/lib/connection');
var routes = require('./api/lib/routes');

var app = express();
app.use(express.cookieParser());
app.use(express.bodyParser());

app.use(express.session({
    secret: configuration.session.secret,
    store: new MongoStore({ url: 'mongodb://' + configuration.database.host, db: configuration.database.database })
}));

app.use('/js/app.js', browserify.serve({ entry: path.join(__dirname, 'app/src/app.js') }));
app.use(express.static(__dirname + '/app'));

routes(app);

app.listen(configuration.server.port);

console.log( 'listening to: ' + configuration.server.port );