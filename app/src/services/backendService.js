var util = require('util');

var angular = require('../lib/angular');

function BackendService($rootScope, $http, authService, messageService) {
    this._$rootScope = $rootScope;
    this._$http = $http;
    this._authService = authService;
    this._messageService = messageService;
}

BackendService.prototype.createWish = function(userId, title, description, callback) {
    var url = util.format('/api/user/%s/wish', userId);

    this._$http.put(url, { title: title, description: description }, {headers: {wichtlyauth: this._authService.getToken()}})
        .success(function () {
            callback(null);
        })
        .error(function (error) {
            callback(error);
        });
};

BackendService.prototype.loadWish = function(userId, wishId, callback) {
    var url = util.format('/api/user/%s/wish/%s', userId, wishId);

    this._$http.get(url, {headers: {wichtlyauth: this._authService.getToken()}})
        .success(function (data) {
            callback(null, data);
        })
        .error(function (error) {
            callback(error);
        });
};

BackendService.prototype.deleteWish = function (userId, wishId, callback) {
    var url = util.format('/api/user/%s/wish/%s', this._authService.getUserId(), wishId);

    this._$http.delete(url, {headers: {wichtlyauth: this._authService.getToken()}})
        .success(function (data) {
            callback(null, data);
        })
        .error(function (error) {
            callback(error);
        });
};

BackendService.prototype.editWish = function (userId, wishId, changes, callback) {
    var url = util.format('/api/user/%s/wish/%s', userId, wishId);

    this._$http.post(url, changes, {headers: {wichtlyauth: this._authService.getToken()}})
        .success(function () {
            callback(null);
        })
        .error(function (error) {
            callback(error);
        });
};

BackendService.prototype.addComment = function (userId, wishId, text, callback) {
    var url = util.format('/api/user/%s/wish/%s/comment', userId, wishId);

    this._$http.put(url, {text: text}, {headers: {wichtlyauth: this._authService.getToken()}})
        .success(function () {
            callback(null);
        })
        .error(function (error) {
            callback(error);
        });
};

BackendService.prototype.deleteComment = function (userId, wishId, commentId, callback) {
    var url = util.format('/api/user/%s/wish/%s/comment/%s', userId, wishId, commentId);

    this._$http.delete(url, {headers: {wichtlyauth: this._authService.getToken()}})
        .success(function () {
            callback(null);
        })
        .error(function (error) {
            callback(error);
        });
};

BackendService.prototype.loadOrganisation = function (organisationId, callback) {
    var url = util.format('/api/organisation/%s', organisationId);

    this._$http.get(url, {headers: {wichtlyauth: this._authService.getToken()}})
        .success(function (data) {
            callback(null, data);
        })
        .error(callback);
};

module.exports.install = function (app) {
    app.service('backendService', BackendService);
};