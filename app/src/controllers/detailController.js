var util = require('util');

function detailController($scope, $http, $routeParams, locationService, authService, messageService) {
    var url = util.format('/api/user/%s/wish/%s', authService.getUserId(), $routeParams.id);

    $http.get(url, {headers: {wichtlyauth: authService.getToken()}})
        .success(function (data) {
            $scope.title = data.title;
            $scope.description = data.description;
        })
        .error(function () {
            messageService.error('unknown error');

            locationService.gotoList();
        });

    $scope.back = function () {
        locationService.gotoList();
    };

    $scope.save = function () {
        var title = $scope.title;
        var description = $scope.description;

        var url = util.format('/api/user/%s/wish/%s', authService.getUserId(), $routeParams.id);

        $http.post(url, { title: title, description: description }, {headers: {wichtlyauth: authService.getToken()}})
            .success(function () {
                messageService.info('saved successfully');

                locationService.gotoList();
            })
            .error(function () {
                messageService.error('on error occured while saving');

                locationService.gotoList();
            });
    }
}

module.exports = detailController;