var messageService = require('./messageService');

function install(app) {
    messageService.install(app);
}

module.exports.install = install;