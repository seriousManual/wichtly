var angular = require('./lib/angular');
var controllers = require('./controllers');
var routes = require('./routes');

var app = angular.module('wichtly', [], function($routeProvider) {
    routes.install($routeProvider);
});

controllers.install(app);

module.exports = app;