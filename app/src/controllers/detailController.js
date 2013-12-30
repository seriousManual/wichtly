var util = require('util');

function detailController($scope, $http, $routeParams, locationService, authService, messageService, backendService) {
    backendService.loadWish(authService.getUserId(), $routeParams.id, function (error, data) {
        if (error) {
            messageService.error('unknown error');

            return locationService.gotoList();
        }

        $scope.title = data.title;
        $scope.description = data.description;
    });

    $scope.back = function () {
        locationService.gotoList();
    };

    $scope.save = function () {
        var title = $scope.title;
        var description = $scope.description;

        var changes = {
            title: title,
            description: description
        };

        backendService.editWish(authService.getUserId(), $routeParams.id, changes, function (error) {
            if (error) {
                messageService.error('beim Speichern ist ein Fehler aufgetreten');
            } else {
                messageService.info('wunsch wurde gespeichert');
            }

            locationService.gotoList();
        });
    };
}

module.exports = detailController;