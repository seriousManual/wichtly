var angular = require('./lib/angular');
var controllers = require('./controllers');
var routes = require('./routes');
var services = require('./services');
var directives = require('./directives');

var app = angular.module('wichtly', [], function($routeProvider) {
    routes.install($routeProvider);
});

directives.install(app);
services.install(app);
controllers.install(app);

module.exports = app;