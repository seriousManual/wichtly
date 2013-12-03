var REDIR_TO = '/wish';

function loginController($scope, $http, $location, messageService, authService) {
    if(authService.getToken()) {
        $location.path(REDIR_TO);
    }

    $scope.login = function () {
        var userName = $scope.userName;
        var password = $scope.password;

        if (!userName || !password) {
            return messageService.error('credentials missing!');
        }

        $http.post('/api/authenticate', { userName:userName, password:password })
                .success(handle)
                .error(handle);

        function handle(data, status) {
            if(status !== 200) {
                messageService.error('sorry, something bad happend');
            } else {
                authService.setToken(data.token);
                authService.setUserId(data.userId);
                authService.setOrganisation(data.organisation);

                $location.path(REDIR_TO);
            }
        }
    };
}

module.exports = loginController;