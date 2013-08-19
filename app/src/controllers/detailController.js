function detailController($scope, $http, $routeParams, $location) {
    $http.get('/api/wish/' + $routeParams.id)
            .success(function(data) {
                $scope.headline = data.headline;
                $scope.text = data.text;
            });

    $scope.save = function() {
        console.log( 'saving: ' + $scope.headline + ' ' + $scope.text );
        $location.path('/wish');
    }
}

module.exports = detailController;