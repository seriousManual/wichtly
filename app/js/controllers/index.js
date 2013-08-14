var wishListController = require('./wishListController');
var loginController = require('./loginController');
var detailController = require('./detailController');
var messageController = require('./messageController');

function install(app) {
    app.controller('wishListController', wishListController);
    app.controller('loginController', loginController);
    app.controller('detailController', detailController);
    app.controller('messageController', messageController);
}

module.exports.install = install;