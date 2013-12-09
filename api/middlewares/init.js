var hirestime = require('hirestime');

var logger = require('../lib/logger');
var d = require('debug')('wichtly:init');

module.exports = function() {
    return function(req, res, next) {
        d('initiating: ' + req.path);
        var getElapsed = hirestime();

        req.WICHTLY = {};

        var _end = res.end;

        res.end = function() {
            logger.info({evt: 'request', path: req.path, dur: getElapsed()});

            _end.apply(res, arguments);
        };

        next();
    };
};