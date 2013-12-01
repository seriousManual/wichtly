var angular = require('../lib/angular');

var AUTH_TOKEN_KEY = 'wichtlyToken';
var AUTH_ID_KEY = 'wichtlyUserId';

function AuthService($cookies) {
    this._$cookies = $cookies;

    this._token = $cookies[AUTH_TOKEN_KEY] || null;
    this._userId = $cookies[AUTH_ID_KEY] || null;
}

AuthService.prototype.getUserId = function() {
    return this._userId;
};

AuthService.prototype.setUserId = function(userId) {
    this._$cookies[AUTH_ID_KEY] = userId;
    this._userId = userId;
};

AuthService.prototype.setToken = function(token) {
    this._$cookies[AUTH_TOKEN_KEY] = token;
    this._token = token;
};

AuthService.prototype.getToken = function() {
    return this._token;
};

module.exports.install = function(app) {
    app.service('authService', AuthService);
};