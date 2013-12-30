var util = require('util');

function newController($scope, $http, $routeParams, locationService, authService, messageService, backendService) {
    $scope.save = function () {
        var userId = $routeParams.userId;
        var title = $scope.title;
        var description = $scope.description;

        if(!title || !description) {
            return messageService.error('title und/oder beschreibung fehlen');
        }

        backendService.createWish(userId, title, description, function(error) {
            if(error) {
                messageService.error('on error occured while saving');
            } else {
                messageService.info('sucessfully created!');
            }

            locationService.gotoList();
        })
    };

    $scope.back = function () {
        locationService.gotoList();
    };
}

module.exports = newController;