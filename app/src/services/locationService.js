var util = require('util');

var angular = require('../lib/angular');

function LocationService($location) {
    this._$location = $location;
    this._analytics = _gaq || [];
}

LocationService.prototype.gotoList = function () {
    this._redirect('/list');
};

LocationService.prototype.gotoLogin = function () {
    this._redirect('/');
};

LocationService.prototype.gotoCreateWish = function (userId) {
    this._redirect(util.format('/user/%s/wish/create', userId));
};

LocationService.prototype.gotoWish = function (wishId) {
    this._redirect(util.format('/wish/%s', wishId))
};

LocationService.prototype._redirect = function(path) {
    this._analytics.push(['_trackPageview', path]);

    this._$location.path(path);
};

module.exports.install = function (app) {
    app.service('locationService', LocationService);
};