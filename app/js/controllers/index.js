var wishListController = require('./wishListController');
var loginController = require('./loginController');
var detailController = require('./detailController');


function install(app) {
    app.controller('wishListController', wishListController);
    app.controller('loginController', loginController);
    app.controller('detailController', detailController);
}

module.exports.install = install;