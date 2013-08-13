function wishList($scope, $http) {
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
}

module.exports = wishList;