var errors = require('../errors');
var Organisation = require('../models/Organisation');

var d = require('debug')('wichtly:organisation');

module.exports = function (app, authorization, organisationLoader) {
    app.get('/api/organisation/:organisationId', authorization, function (req, res, next) {
        var organisationId = req.params.organisationId;

        d('loading organisation %s', organisationId);

        organisationLoader.loadOrganisation(organisationId, function(error, result) {
            if (error) return next(error);

            res.send(200, result);
        });
    });

    app.get('/api/organisation/:organisationId/wish', authorization, function (req, res, next) {
        var organisationId = req.params.organisationId;

        d('loading organisation %s', organisationId);

        organisationLoader.loadOrganisation(organisationId, function(error, result) {
            if (error) return next(error);

            res.send(200, result);
        });
    });
};

//GET /api/organisation/:organisationId
//GET /api/organisation/:organisationId/wish