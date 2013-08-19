function messageDirective($timeout) {
    return {
        restrict:'E',
        scope: {
            message: '='
        },
        templateUrl: '/partials/messageView.html',
        link:function ($scope, $element, attributes) {
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

