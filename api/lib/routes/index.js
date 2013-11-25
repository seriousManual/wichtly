var authorize = require('./authorize');
var wish = require('./wish');

module.exports = function(app) {

    authorize(app);
    wish(app);

    app.use(function errorHandler(error, req, res, next) {
        if(!error.statusCode || !error.message) {
            error = new errors.InternalServerError();
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(error.statusCode, error.message);
    });
};