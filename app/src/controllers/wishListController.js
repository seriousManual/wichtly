var util = require('util');

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

    $scope.addWish = function (userId) {
        locationService.gotoCreateWish(userId);
    };

    function handle(error, result) {
        if (error) {
            return messageService.error(error.message);
        }

        result.forEach(function (user) {
            var isOwn = user._id === authService.getUserId();

            user.wishes.forEach(function (wish) {
                wish.isOwn = isOwn;
            });
        });

        $scope.grouped = result;
    }

    $scope.reworkText = function (text) {
        var linebreakPattern = /[\n]/g;
        var urlPattern = /(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/ig;

        text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        text = text.replace(linebreakPattern, '<br>');

        var res = text.match(urlPattern);

        if (!res) return text;

        res.forEach(function (url) {
            var insertUrl, newUrl;
            if (url.length > 40) {
                insertUrl = url.substr(0, 20) + '[...]' + url.substr(-20);
            } else {
                insertUrl = url;
            }

            var replaceText = '<a href="' + newUrl + '">' + insertUrl + '</a>';

            text = text.replace(url, replaceText);
        });

        return text;
    };
}

function retrieve($http, authService, callback) {
    var url = util.format('/api/organisation/%s/user', authService.getOrganisation());

    $http.get(url, {headers: {wichtlyauth: authService.getToken()}})
        .success(function (data) {
            callback(null, data);
        })
        .error(callback);
}

module.exports = wishList;