var util = require('util');

function wishList($scope, $http, $location, authService, messageService) {
    retrieve($http, authService, handle);

    $scope.edit = function (wishId) {
        $location.path('/wish/' + wishId);
    };

    $scope.delete = function(wishId) {
        var url = util.format('/api/user/%s/wish/%s', authService.getUserId(), wishId);

        $http.delete(url, {headers:{wichtlyauth:authService.getToken()}})
                .success(function (data) {
                    retrieve($http, authService, handle);
                });
    };

    function handle(error, result) {
        if(error) {
            return messageService.error(error.message);
        }

        $scope.grouped = result;
    }
}



function retrieve($http, authService, callback) {
    $http.get('/api/wish', {headers:{wichtlyauth:authService.getToken()}})
            .success(function (data) {
                var grouped = [];
                var users = {};

                data.forEach(function (data) {
                    if (!users[data.owner.userName]) {
                        users[data.owner.userName] = [];
                    }

                    users[data.owner.userName].push(data);
                });

                Object.keys(users).forEach(function (userName) {
                    var tmp = {
                        name:userName,
                        wishes:users[userName]
                    };

                    grouped.push(tmp);
                });

                callback(null, grouped);
            })
            .error(function(error) {
                callback(error);
            });
}

module.exports = wishList;