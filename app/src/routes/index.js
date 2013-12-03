function install($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/loginView.html',
        controller: 'loginController'
    });

    $routeProvider.when('/list', {
        templateUrl: '/partials/listView.html',
        controller: 'wishListController'
    });

    $routeProvider.when('/wish/:id', {
        templateUrl: '/partials/changeView.html',
        controller: 'detailController'
    });

    $routeProvider.when('/user/:userId/wish/create', {
        templateUrl: '/partials/changeView.html',
        controller: 'newController'
    });

    $routeProvider.otherwise({
        templateUrl: '/partials/loginView.html',
        controller: 'detailController'
    });
}

module.exports.install = install;