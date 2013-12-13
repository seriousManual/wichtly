var hirestime = require('hirestime');

var logger = require('../lib/logger');

module.exports = function() {
    return function(req, res, next) {
        var getElapsed = hirestime();

        res.on('header', function() {
            logger.info({
                mod: 'main',
                evt: 'request',
                path: req.path,
                statusCode: res.statusCode,
                dur: getElapsed(),
                ip: req.ip
            });
        });

        next();
    };
};