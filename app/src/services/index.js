var messageService = require('./messageService');
var authService = require('./authService');

function install(app) {
    messageService.install(app);
    authService.install(app);
}

module.exports.install = install;