var d = require('debug')('wichtly:init');

module.exports = function() {
    return function(req, res, next) {
        d('initiating: ' + req.path);

        req.WICHTLY = {};

        var _end = res.end;

        res.end = function() {
            d('finished');

            _end.apply(res, arguments);
        };

        next();
    };
};