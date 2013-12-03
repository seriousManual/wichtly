var util = require('util');

function detailController($scope, $http, $routeParams, $location, authService, messageService) {
    var url = util.format('/api/user/%s/wish/%s', authService.getUserId(), $routeParams.id);
console.log( authService.getUserId(), $routeParams.id, url );
    $http.get(url, {headers:{wichtlyauth: authService.getToken()}})
            .success(function(data) {
                $scope.title = data.title;
                $scope.description = data.description;
            })
            .error(function() {
                messageService.error('unknown error');

                $location.path('/list');
            });

    $scope.save = function() {
        var title = $scope.title;
        var description = $scope.description;

        var url = util.format('/api/user/%s/wish/%s', authService.getUserId(), $routeParams.id);

        $http.post(url, { title:title, description:description }, {headers:{wichtlyauth: authService.getToken()}})
                .success(function() {
                    messageService.info('saved successfully');

                    $location.path('/list');
                })
                .error(function() {
                    messageService.error('on error occured while saving');

                    $location.path('/list');
                });
    }
}

module.exports = detailController;