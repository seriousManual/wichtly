var winston = require('winston');
var Splnkstrm = require('winston-splnkstrm');
var Logentries = require('winston-logentries');

var configuration = require('./configuration');

var transports = [];

if(configuration.logging.transport === 'Console') {
    transports.push(new (winston.transports.Console)());
}

if(configuration.logging.transport === 'Splnkstrm') {
    transports.push(new (winston.transports.Splnkstrm)(
        configuration.logging.options
    ));
}

if(configuration.logging.transport === 'Logentries') {
    transports.push(new (winston.transports.Logentries)(
        configuration.logging.options
    ));
}

var logger = new (winston.Logger)({
    transports: transports
});

module.exports = logger;