var logger = require('../lib/logger');
var d = require('debug')('wichtly:init');

module.exports = function() {
    return function(req, res, next) {
        d('initiating: ' + req.path);

        req.WICHTLY = {};

        next();
    };
};