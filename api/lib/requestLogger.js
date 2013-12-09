var logger = require('./logger');

module.exports = function(app) {
    app.use(function(req, res, next) {
        logger.info({evt: 'request', path: req.path, method: req.method});

        next();
    });
};