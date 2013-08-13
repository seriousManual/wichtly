var wishListController = require('./wishList');

function install(app) {
    app.controller('wishList', wishListController);
}

module.exports.install = install;