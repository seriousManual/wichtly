var depugger = require('depugger');

var configuration = require('./configuration');

module.exports = depugger({debug: configuration.debug, name: 'api'});