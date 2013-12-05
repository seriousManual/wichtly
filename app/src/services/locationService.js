var util = require('util');

var angular = require('../lib/angular');

function LocationService($location) {
    this._$location = $location;
}

LocationService.prototype.gotoList = function () {
    this._$location.path('/list');
};

LocationService.prototype.gotoLogin = function () {
    this._$location.path('/');
};

LocationService.prototype.gotoCreateWish = function (userId) {
    var path = util.format('/user/%s/wish/create', userId);

    this._$location.path(path);
};

LocationService.prototype.gotoWish = function (wishId) {
    var path = util.format('/wish/%s', wishId);

    this._$location.path(path);
};

module.exports.install = function (app) {
    app.service('locationService', LocationService);
};