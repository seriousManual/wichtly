var path = require('path');

var express = require('express');
var browserify = require('connect-browserify');
var argv = require('optimist').argv;

var connection = require('./api/lib/connection');
var routes = require('./api/routes');

var app = express();
var port = argv.port || 8000;

app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));

app.use('/js/app.js', browserify.serve({ entry: path.join(__dirname, 'app/src/app.js') }));
app.use(express.static(__dirname + '/app'));

routes.install(app);

app.listen(port);

console.log( 'listening to: ' + port );