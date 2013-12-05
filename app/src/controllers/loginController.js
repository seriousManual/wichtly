function loginController($scope, $http, locationService, messageService, authService) {
    if (authService.getToken()) {
        locationService.gotoList();
    }

    $scope.login = function () {
        var userName = $scope.userName;
        var password = $scope.password;

        if (!userName || !password) {
            return messageService.error('credentials missing!');
        }

        $http.post('/api/authenticate', { userName: userName, password: password })
            .success(handle)
            .error(handle);

        function handle(data, status) {
            if (status == 401) {
                messageService.error('username oder passwort inkorrekt');
            } else if (status !== 200) {
                messageService.error('sorry, something bad happend');
            } else {
                authService.setData(data);

                locationService.gotoList();
            }
        }
    };
}

module.exports = loginController;