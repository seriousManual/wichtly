var messageService = require('./messageService');
var authService = require('./authService');
var locationService = require('./locationService');

function install(app) {
    messageService.install(app);
    authService.install(app);
    locationService.install(app);
}

module.exports.install = install;