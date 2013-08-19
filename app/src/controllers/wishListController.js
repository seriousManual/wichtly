function wishList($scope, $http, $location) {
    $http.get('/api/wish')
            .success(function(data) {
                var grouped = [];
                var users = {};

                data.forEach(function(data) {
                    if(!users[data.owner]) {
                        users[data.owner] = [];
                    }

                    users[data.owner].push(data);
                });

                Object.keys(users).forEach(function(userName) {
                    var tmp = {
                        name: userName,
                        wishes: users[userName]
                    };

                    grouped.push(tmp);
                });

                $scope.grouped = grouped;
            });

    $scope.edit = function(wishId) {
        $location.path('/wish/' + wishId);
    }
}

module.exports = wishList;