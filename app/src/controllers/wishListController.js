var util = require('util');

function wishList($scope, $http, $location, authService, messageService) {
    retrieve($http, authService, handle);

    $scope.edit = function (userId, wishId) {
        $location.path(util.format('/wish/%s', wishId));
    };

    $scope.deleteWish = function (wishId) {
        var url = util.format('/api/user/%s/wish/%s', authService.getUserId(), wishId);

        $http.delete(url, {headers: {wichtlyauth: authService.getToken()}})
            .success(function (data) {
                retrieve($http, authService, handle);
            })
            .error(function() {
                messageService.error('sorry...');
            });
    };

    $scope.bought = function (wishId) {
        var url = util.format('/api/user/%s/wish/%s', authService.getUserId(), wishId);

        $http.post(url, {bought:true}, {headers: {wichtlyauth: authService.getToken()}})
            .success(function (data) {
                retrieve($http, authService, handle);
            })
            .error(function() {
                messageService.error('sorry...');
            });
    };

    $scope.addWish = function(userId) {
        $location.path(util.format('/user/%s/wish/create', userId));
    };

    function handle(error, result) {
        if (error) {
            return messageService.error(error.message);
        }

        result.forEach(function(user) {
            var isOwn = user._id === authService.getUserId();

            user.wishes.forEach(function(wish) {
                wish.isOwn = isOwn;
            });
        });

        $scope.grouped = result;
    }
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