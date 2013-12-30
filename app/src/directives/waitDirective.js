function waitDirective() {
    return {
        restrict: 'E',
        templateUrl: '/partials/waitView.html',
        link: function ($scope) {
            $scope.showWait = false;
        },
        controller: function ($scope, $rootScope, $timeout) {
            $rootScope.$on('messageWait', function(event, show) {
                $scope.showWait = show;
            });
        }
    };
}

module.exports.install = function (app) {
    app.directive('ngWait', waitDirective);
};

