function messageDirective($timeout) {
    return {
        restrict:'E',
        scope: {
            message: '='
        },
        link:function ($scope, $element, attributes) {
            $element.addClass('alert-' + $scope.message.what);

            $timeout(function() {
                $element.fadeOut(500);
            }, 2000);
            //TODO: remove the element from the dom *AND* the controller
        }
    };
}

module.exports.install = function(app) {
    app.directive('message', messageDirective);
};

