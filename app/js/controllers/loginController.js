function loginController($scope, $location) {
    $scope.login = function() {
        $location.path('/wish');
    }
}

module.exports = loginController;