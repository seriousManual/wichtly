var angular = require('./lib/angular');
var controllers = require('./controllers');

var app = angular.module('wichtly', []);

controllers.install(app);

module.exports = app;