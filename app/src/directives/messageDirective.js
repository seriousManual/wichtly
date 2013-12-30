function messageDirective($timeout) {
    return {
        restrict: 'E',
        scope: {
            message: '='
        },
        templateUrl: '/partials/messageView.html',
        link: function ($scope) {
            $scope.messages = [];
        },
        controller: function ($scope, $rootScope, $timeout) {
            $rootScope.$on('message', function(event, message) {
                $scope.messages.push(message);

                $timeout(function() {
                    var index = $scope.messages.indexOf(message);

                    if (index > -1) {
                        $scope.messages.splice(index, 1);
                    }
                }, 2000);
            });
        }
    };
}

module.exports.install = function (app) {
    app.directive('ngMessage', messageDirective);
};

