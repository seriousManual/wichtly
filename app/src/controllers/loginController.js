function loginController($scope, $http, locationService, messageService, authService) {
    if (authService.getToken()) {
        locationService.gotoList();
    }

    $scope.login = function () {
        var mail = $scope.mail;
        var password = $scope.password;

        if (!mail || !password) {
            return messageService.error('credentials missing!');
        }

        $http.post('/api/authenticate', { mail: mail, password: password })
            .success(handle)
            .error(handle);

        function handle(data, status) {
            if (status === 401) {
                messageService.error('mail adresse oder passwort inkorrekt');
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