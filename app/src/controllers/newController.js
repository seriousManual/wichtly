var util = require('util');

function newController($scope, $http, $routeParams, locationService, authService, messageService) {
    $scope.save = function () {
        var userId = $routeParams.userId;
        var title = $scope.title;
        var description = $scope.description;

        var url = util.format('/api/user/%s/wish', userId);

        $http.put(url, { title: title, description: description }, {headers: {wichtlyauth: authService.getToken()}})
            .success(function () {
                messageService.info('sucessfully created!');

                locationService.gotoList();
            })
            .error(function () {
                messageService.error('on error occured while saving');

                locationService.gotoList();
            });
    };

    $scope.back = function () {
        locationService.gotoList();
    };
}

module.exports = newController;