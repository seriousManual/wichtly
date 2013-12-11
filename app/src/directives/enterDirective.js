function enterDirective($timeout) {
    var debounceStateFree = true;

    function debounceInit() {
        debounceStateFree = false;

        $timeout(function () {
            debounceStateFree = true;
        }, 1000);
    }

    function isReleased() {
        return debounceStateFree;
    }

    return function (scope, element, attrs) {
        var debounce = !!attrs.ngEnterDebounce;

        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                if (debounce) {
                    if (!isReleased()) return;

                    debounceInit();
                }

                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
}

module.exports.install = function (app) {
    app.directive('ngEnter', enterDirective);
};