function loginController($scope) {
    $scope.foo = function() {
        $scope.email = Math.random();
    }
}

module.exports = loginController;