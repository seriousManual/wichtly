var hirestime = require('hirestime');

var logger = require('../lib/logger');

module.exports = function (method, route) {
    route = route || '';

    return function (req, res, next) {
        var getElapsed = hirestime();

        res.on('header', function () {
            logger.info({mod: 'router', evt: 'apiRequest', method: method, path: route, dur: getElapsed()});
        });

        next();
    }
};