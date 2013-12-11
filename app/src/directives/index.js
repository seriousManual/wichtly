var messageDirective = require('./messageDirective');
var enterDirective = require('./enterDirective');

module.exports.install = function(app) {
    messageDirective.install(app);
    enterDirective.install(app);
};