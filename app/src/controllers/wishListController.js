var util = require('util');

var textTools = require('../lib/utils/textTools');

function wishList($scope, $http, locationService, authService, messageService) {
    retrieve($http, authService, handle);

    $scope.edit = function (userId, wishId) {
        locationService.gotoWish(wishId);
    };

    $scope.deleteWish = function (userId, wishId) {
        var url = util.format('/api/user/%s/wish/%s', authService.getUserId(), wishId);

        $http.delete(url, {headers: {wichtlyauth: authService.getToken()}})
            .success(function (data) {
                retrieve($http, authService, handle);
            })
            .error(function () {
                messageService.error('sorry...');
            });
    };

    $scope.bought = function (userId, wishId) {
        var url = util.format('/api/user/%s/wish/%s', userId, wishId);

        $http.post(url, {bought: true}, {headers: {wichtlyauth: authService.getToken()}})
            .success(function (data) {
                retrieve($http, authService, handle);
            })
            .error(function () {
                messageService.error('sorry...');
            });
    };

    $scope.acknowledge = function (userId, wishId) {
        var url = util.format('/api/user/%s/wish/%s', userId, wishId);

        //TODO: bad hack, we should set the actual creators name here..........
        $http.post(url, {creator: ''}, {headers: {wichtlyauth: authService.getToken()}})
            .success(function (data) {
                retrieve($http, authService, handle);
            })
            .error(function () {
                messageService.error('sorry...');
            });
    };

    $scope.addWish = function (userId) {
        locationService.gotoCreateWish(userId);
    };

    $scope.deleteComment = function (userId, wishId, commentId) {
        var url = util.format('/api/user/%s/wish/%s/comment/%s', userId, wishId, commentId);

        $http.delete(url, {headers: {wichtlyauth: authService.getToken()}})
            .success(function (data) {
                retrieve($http, authService, handle);
            })
            .error(function () {
                messageService.error('sorry...');
            });
    };

    $scope.addComment = function (userId, wishId, text) {
        if (!text) return;

        var url = util.format('/api/user/%s/wish/%s/comment', userId, wishId);

        $http.put(url, {text: text}, {headers: {wichtlyauth: authService.getToken()}})
            .success(function (data) {
                retrieve($http, authService, handle);
            })
            .error(function () {
                messageService.error('sorry...');
            });
    };

    function handle(error, result) {
        if (error) {
            return messageService.error(error.message);
        }

        result.members.forEach(function (user) {
            var isOwn = user._id === authService.getUserId();

            user.wishes.forEach(function (wish) {
                wish.proposedBy = wish.creator && wish.creator !== user.userName ? wish.creator : '';
                wish.isOwn = isOwn;
            });
        });

        $scope.organisationName = result.name;
        $scope.grouped = result.members;
    }

    $scope.reworkText = function (text) {
        text = textTools.sanitize(text);
        text = textTools.replaceLinebreaks(text);
        text = textTools.replaceUrls(text);

        return text;
    };
}

function retrieve($http, authService, callback) {
    var url = util.format('/api/organisation/%s', authService.getOrganisation());

    $http.get(url, {headers: {wichtlyauth: authService.getToken()}})
        .success(function (data) {
            callback(null, data);
        })
        .error(callback);
}

module.exports = wishList;