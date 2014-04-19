var util = require('util');

var angular = require('../lib/angular');

function BackendService($rootScope, $http, authService, messageService) {
    var that = this;

    this._$rootScope = $rootScope;
    this._$http = $http;
    this._authService = authService;
    this._messageService = messageService;

    this.createWish = wrap(function(userId, title, description, callback) {
        var url = util.format('/api/user/%s/wish', userId);

        that._$http.put(url, { title: title, description: description }, {headers: {wichtlyauth: that._authService.getToken()}})
            .success(callback.bind(null, null))
            .error(callback);
    });

    this.loadWish = wrap(function(userId, wishId, callback) {
        var url = util.format('/api/user/%s/wish/%s', userId, wishId);

        that._$http.get(url, {headers: {wichtlyauth: that._authService.getToken()}})
            .success(function (data) {
                callback(null, data);
            })
            .error(function (error) {
                callback(error);
            });
    });

    this.deleteWish = wrap(function (userId, wishId, callback) {
        var url = util.format('/api/user/%s/wish/%s', that._authService.getUserId(), wishId);

        that._$http.delete(url, {headers: {wichtlyauth: that._authService.getToken()}})
            .success(function (data) {
                callback(null, data);
            })
            .error(function (error) {
                callback(error);
            });
    });

    this.editWish = wrap(function (userId, wishId, changes, callback) {
        var url = util.format('/api/user/%s/wish/%s', userId, wishId);

        that._$http.post(url, changes, {headers: {wichtlyauth: that._authService.getToken()}})
            .success(function () {
                callback(null);
            })
            .error(function (error) {
                callback(error);
            });
    });

    this.addComment = wrap(function (userId, wishId, text, callback) {
        var url = util.format('/api/user/%s/wish/%s/comment', userId, wishId);

        that._$http.put(url, {text: text}, {headers: {wichtlyauth: that._authService.getToken()}})
            .success(function () {
                callback(null);
            })
            .error(function (error) {
                callback(error);
            });
    });

    this.deleteComment = wrap(function (userId, wishId, commentId, callback) {
        var url = util.format('/api/user/%s/wish/%s/comment/%s', userId, wishId, commentId);

        that._$http.delete(url, {headers: {wichtlyauth: that._authService.getToken()}})
            .success(function () {
                callback(null);
            })
            .error(function (error) {
                callback(error);
            });
    });

    this.loadOrganisation = wrap(function (organisationId, callback) {
        var url = util.format('/api/organisation/%s', organisationId);

        that._$http.get(url, {headers: {wichtlyauth: that._authService.getToken()}})
            .success(function (data) {
                callback(null, data);
            })
            .error(callback);
    });

    function wrap(fn) {
        return function() {
            var args = Array.prototype.splice.call(arguments, 0);
            var _callback = args.pop();

            args.push(function() {
                that._messageService.waitEnd();

                _callback.apply(null, arguments);
            });

            that._messageService.waitStart();
            fn.apply(that, args);
        }
    }
}

module.exports.install = function (app) {
    app.service('backendService', BackendService);
};
