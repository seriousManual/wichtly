function install($rootScope, messageService) {
    $rootScope.$on( '$routeChangeStart', function(event, next, current) {
        messageService.waitStart();
    });

    $rootScope.$on('$routeChangeSuccess', function() {
        messageService.waitEnd();
    });

    $rootScope.$on('$routeChangeError', function() {
        messageService.waitEnd();
    });
}

module.exports.install = install;