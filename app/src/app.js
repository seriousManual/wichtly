var angular = require('./lib/angular');
var controllers = require('./controllers');
var routes = require('./routes');
var routeHandler = require('./routes/handler');
var services = require('./services');
var directives = require('./directives');

var app = angular.module('wichtly', ['ngCookies'])
    .config(function($routeProvider) {
        routes.install($routeProvider);
    })
    .run(function($rootScope, messageService) {
        routeHandler.install($rootScope, messageService);
    });

directives.install(app);
services.install(app);
controllers.install(app);

module.exports = app;