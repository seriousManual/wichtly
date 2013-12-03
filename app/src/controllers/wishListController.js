var util = require('util');

function wishList($scope, $http, $location, authService, messageService) {
    retrieve($http, authService, handle);

    $scope.edit = function (wishId) {
        $location.path('/wish/' + wishId);
    };

    $scope.delete = function (wishId) {
        var url = util.format('/api/user/%s/wish/%s', authService.getUserId(), wishId);

        $http.delete(url, {headers: {wichtlyauth: authService.getToken()}})
            .success(function (data) {
                retrieve($http, authService, handle);
            });
    };

    function handle(error, result) {
        if (error) {
            return messageService.error(error.message);
        }

        $scope.grouped = result;
    }
}

function retrieve($http, authService, callback) {
    var organisation = '529e2414a25914001a000002';

    var url = util.format('/api/organisation/%s/user', organisation);

    $http.get(url, {headers: {wichtlyauth: authService.getToken()}})
        .success(function (data) {
            callback(null, data);
        })
        .error(callback);
}

module.exports = wishList;