function install($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/loginView.html',
        controller: 'loginController'
    });

    $routeProvider.when('/wish', {
        templateUrl: '/partials/listView.html',
        controller: 'wishListController'
    });

    $routeProvider.when('/wish/:id', {
        templateUrl: '/partials/changeView.html',
        controller: 'detailController'
    });

    $routeProvider.otherwise({
        templateUrl: '/partials/loginView.html',
        controller: 'detailController'
    });
}

module.exports.install = install;