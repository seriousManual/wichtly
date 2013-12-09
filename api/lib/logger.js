var winston = require('winston');
var Splnkstrm = require('winston-splnkstrm');

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

var logger = new (winston.Logger)({
    transports: transports
});

module.exports = logger;