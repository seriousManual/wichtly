var angular = require('./lib/angular');
var controllers = require('./controllers');
var routes = require('./routes');
var services = require('./services');

var app = angular.module('wichtly', [], function($routeProvider) {
    routes.install($routeProvider);
});

services.install(app);
controllers.install(app);

module.exports = app;