var path = require('path');

var express = require('express');
var browserify = require('connect-browserify');

var configuration = require('./api/lib/configuration');
var bootStrap = require('./api/lib/Bootstrap');
var d = require('debug')('wichtly');

var app = express();
app.use(express.cookieParser());
app.use(express.bodyParser());


app.configure('development', function(){
    app.use('/js/app.js', browserify.serve({ entry:path.join(__dirname, 'app/src/app.js') }));
});

app.use(express.static(__dirname + '/app'));

bootStrap(app, function (error) {
    if (error) {
        d('bootstrap error: %s', error.message);

        process.exit(1);
    }

    app.listen(configuration.server.port);

    d('listening to: %d', configuration.server.port);
});