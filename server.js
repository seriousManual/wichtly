var path = require('path');

var express = require('express');
var browserify = require('connect-browserify');

var configuration = require('./api/lib/configuration');
var bootStrap = require('./api/lib/Bootstrap');

var app = express();
app.use(express.cookieParser());
app.use(express.bodyParser());

app.use('/js/app.js', browserify.serve({ entry:path.join(__dirname, 'app/src/app.js') }));
app.use(express.static(__dirname + '/app'));

bootStrap(app, function (error) {
    if (error) {
        console.log('wow, bad things happend: ', error);

        process.exit(1);
    }

    app.listen(configuration.server.port);

    console.log('listening to: ' + configuration.server.port);
});