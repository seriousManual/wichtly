function logoutController($scope, locationService, authService) {
    authService.flush();

    locationService.gotoLogin();
}

module.exports = logoutController;