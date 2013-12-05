function logoutController($scope, $location, authService) {
    authService.flush();

    $location.path('/');
}

module.exports = logoutController;