function messageDirective($timeout) {
    return {
        restrict:'E',
        scope: {
            message: '='
        },
        templateUrl: '/partials/messageView.html',
        link:function ($scope, $element, attributes) {
            //TODO: after 2000ms remove the element from the dom *AND* the model
            $timeout(function() {
                $element.fadeOut(500);
            }, 2000);
        }
    };
}

module.exports.install = function(app) {
    app.directive('message', messageDirective);
};

