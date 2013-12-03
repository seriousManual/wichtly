var wishListController = require('./wishListController');
var loginController = require('./loginController');
var detailController = require('./detailController');
var messageController = require('./messageController');
var newController = require('./newController');

function install(app) {
    app.controller('wishListController', wishListController);
    app.controller('loginController', loginController);
    app.controller('detailController', detailController);
    app.controller('messageController', messageController);
    app.controller('newController', newController);
}

module.exports.install = install;