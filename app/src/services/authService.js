var angular = require('../lib/angular');

var AUTH_TOKEN_KEY = 'wichtlyToken';
var AUTH_ID_KEY = 'wichtlyUserId';
var AUTH_ORGANISTION_KEY = 'wichtlyOrganisation';

function AuthService($cookies) {
    this._$cookies = $cookies;

    this._token = $cookies[AUTH_TOKEN_KEY] || null;
    this._userId = $cookies[AUTH_ID_KEY] || null;
    this._organisation = $cookies[AUTH_ORGANISTION_KEY] || null;
}

AuthService.prototype.getUserId = function() {
    return this._userId;
};

AuthService.prototype.getOrganisation = function() {
    return this._organisation;
};

AuthService.prototype.getToken = function() {
    return this._token;
};

AuthService.prototype.setUserId = function(userId) {
    this._$cookies[AUTH_ID_KEY] = userId;
    this._userId = userId;
};

AuthService.prototype.setToken = function(token) {
    this._$cookies[AUTH_TOKEN_KEY] = token;
    this._token = token;
};

AuthService.prototype.setOrganisation = function(organisation) {
    this._$cookies[AUTH_ORGANISTION_KEY] = organisation;
    this._organisation = organisation;
};

module.exports.install = function(app) {
    app.service('authService', AuthService);
};