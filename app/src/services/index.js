var messageService = require('./messageService');
var authService = require('./authService');
var locationService = require('./locationService');
var backendService = require('./backendService');

function install(app) {
    messageService.install(app);
    authService.install(app);
    locationService.install(app);
    backendService.install(app);
}

module.exports.install = install;