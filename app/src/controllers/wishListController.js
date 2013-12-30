var util = require('util');

var textTools = require('../lib/utils/textTools');

function wishList($scope, $http, locationService, authService, messageService, backendService) {
    backendService.loadOrganisation(authService.getOrganisation(), handle);

    $scope.gotoUser = function (userId) {
        locationService.gotoList(userId);
    };

    $scope.edit = function (userId, wishId) {
        locationService.gotoWish(wishId);
    };

    $scope.deleteWish = function (userId, wishId) {
        backendService.deleteWish(userId, wishId, function (error) {
            if (error) return messageService.error('Wunsch konnte nicht gelöscht werden');

            backendService.loadOrganisation(authService.getOrganisation(), handle);
        });
    };

    $scope.bought = function (userId, wishId) {
        backendService.editWish(userId, wishId, {bought: true}, function (error) {
            if (error) return messageService.error('konnte wunsch nicht auf gekauft setzen');

            loadOrganisation();
        });
    };

    $scope.acknowledge = function (userId, wishId) {
        //TODO: bad hack, we should set the actual creators name here..........
        backendService.editWish(userId, wishId, {creator: ''}, function (error) {
            if (error) return messageService.error('konnte wunsch nicht bestätigt werden');

            loadOrganisation();
        });
    };

    $scope.addWish = function (userId) {
        locationService.gotoCreateWish(userId);
    };

    $scope.deleteComment = function (userId, wishId, commentId) {
        backendService.deleteComment(userId, wishId, commentId, function (error) {
            if (error) return messageService.error('kommentar konnte nicht gelöscht werden');

            loadOrganisation();
        });
    };

    $scope.addComment = function (userId, wishId, text) {
        if (!text) return;

        backendService.addComment(userId, wishId, text, function (error) {
            if (error) return messageService.error('kommentar konnte nicht erstellt werden');

            loadOrganisation();
        });
    };

    function loadOrganisation() {
        backendService.loadOrganisation(authService.getOrganisation(), handle);
    }

    function handle(error, result) {
        if (error) {
            return messageService.error(error.message);
        }

        result.members.forEach(function (user) {
            var isOwn = user._id === authService.getUserId();

            user.wishes.forEach(function (wish) {
                wish.proposedBy = wish.creator && wish.creator !== user.userName ? wish.creator : '';
                wish.isOwn = isOwn;
            });
        });

        $scope.organisationName = result.name;
        $scope.grouped = result.members;
    }

    $scope.reworkText = function (text) {
        text = textTools.sanitize(text);
        text = textTools.replaceLinebreaks(text);
        text = textTools.replaceUrls(text);

        return text;
    };
}

module.exports = wishList;