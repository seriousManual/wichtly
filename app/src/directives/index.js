var messageDirective = require('./messageDirective');
var enterDirective = require('./enterDirective');
var waitDirective = require('./waitDirective');

module.exports.install = function(app) {
    messageDirective.install(app);
    enterDirective.install(app);
    waitDirective.install(app);
};