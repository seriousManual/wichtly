var express = require('express');

var routes = require('./api/routes');

var app = express();
var port = 8000;

app.use(express.static(__dirname + '/app'));

routes.install(app);

app.listen(port);

console.log( 'listening to: ' + port );