var hirestime = require('hirestime');

var logger = require('../lib/logger');

module.exports = function(method, route) {
    route = route || '';

    return function(req, res, next) {
        var getElapsed = hirestime();

        var _end = res.end;

        res.end = function() {
            logger.info({mod: 'router', evt: 'apiRequest', method:method, path: route, dur: getElapsed()});

            _end.apply(res, arguments);
        };

        next();
    }
};