var util = require('util');

function newController($scope, $http, $routeParams, $location, authService, messageService) {
    $scope.save = function() {
        var userId = $routeParams.userId;
        var title = $scope.title;
        var description = $scope.description;

        var url = util.format('/api/user/%s/wish', userId);

        $http.put(url, { title:title, description:description }, {headers:{wichtlyauth: authService.getToken()}})
            .success(function() {
                messageService.info('sucessfully created!');

                $location.path('/list');
            })
            .error(function() {
                messageService.error('on error occured while saving');

                $location.path('/list');
            });
    };

    $scope.back = function() {
        $location.path('/list');
    };
}

module.exports = newController;