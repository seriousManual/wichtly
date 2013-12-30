function waitDirective() {
    var waitStack = 0;

    return {
        restrict: 'E',
        templateUrl: '/partials/waitView.html',
        link: function ($scope) {
            $scope.showWait = false;
        },
        controller: function ($scope, $rootScope, $timeout) {
            $rootScope.$on('messageWait', function (event, show) {
                waitStack += (show ? 1 : -1);

                $scope.showWait = waitStack > 0;
            });
        }
    };
}

module.exports.install = function (app) {
    app.directive('ngWait', waitDirective);
};

