function loginController($scope, $location, messageService) {
    $scope.login = function() {
        if(Math.random() < 0.3) {
            messageService.error('Error!', 'Wrong credentials!');
        } else if(Math.random() < 0.6) {
            messageService.ok('OK!', 'Login successful.');
        } else if(Math.random() < 1) {
            messageService.info('FYI.', 'Breaking the law is illegal.');
        }
    }
}

module.exports = loginController;