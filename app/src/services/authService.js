var angular = require('../lib/angular');

var AUTH_DATA_KEY = 'wichtlyAuth';

var AUTH_TOKEN_KEY = 'token';
var AUTH_ID_KEY = 'userId';
var AUTH_ORGANISATION_KEY = 'organisation';


function AuthService($cookies) {
    this._$cookies = $cookies;

    this._token = null;
    this._userId = null;
    this._organisation = null;

    this._readCookie();
}

AuthService.prototype._readCookie = function() {
    var cookieData = this._$cookies[AUTH_DATA_KEY];

    if(!cookieData) {
        return;
    }

    try {
        this._readData(JSON.parse(cookieData));
    } catch (error) {
    }
};

AuthService.prototype._readData = function(data) {
    this._organisation = data[AUTH_ORGANISATION_KEY];
    this._userId = data[AUTH_ID_KEY];
    this._token = data[AUTH_TOKEN_KEY];
};

AuthService.prototype.setData = function(data) {
    this._$cookies[AUTH_DATA_KEY] = JSON.stringify(data);

    this._readData(data);
};

AuthService.prototype.getUserId = function() {
    return this._userId;
};

AuthService.prototype.getToken = function() {
    return this._token;
};

AuthService.prototype.getOrganisation = function() {
    return this._organisation;
};

AuthService.prototype.flush = function() {
    this._organisation = null;
    this._userId = null;
    this._token = null;

    delete this._$cookies[AUTH_DATA_KEY];
};

module.exports.install = function(app) {
    app.service('authService', AuthService);
};