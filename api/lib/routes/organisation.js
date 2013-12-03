var errors = require('../errors');
var Organisation = require('../models/Organisation');

var d = require('debug')('wichtly:organisation');

module.exports = function (app, authorization, organisationLoader) {
    app.get('/api/organisation/:organisationId', authorization, function (req, res, next) {
        var organisationId = req.params.organisationId;

        d('loading organisation %s', organisationId);

        organisationLoader.loadOrganisation(organisationId, function (error, result) {
            if (error) return next(error);

            res.send(200, result);
        });
    });

    app.get('/api/organisation/:organisationId/user', authorization, function (req, res, next) {
        var organisationId = req.params.organisationId;

        d('loading organisation %s', organisationId);

        organisationLoader.loadOrganisation(organisationId, function (error, result) {
            if (error) return next(error);

            res.send(200, result.members);
        });
    });

    app.put('/api/organisation/:organisationId/user', authorization, function (req, res, next) {
        var organisationId = req.params.organisationId;

        var userName = req.body.userName;
        var mail = req.body.mail;
        var password = req.body.password;

        d('adding user');

        organisationLoader.loadOrganisation(organisationId, function (error, organisation) {
            if (error) return next(error);

            organisation.members.push({
                userName: userName,
                mail: mail,
                password: password
            });

            res.send(201, organisation);
        });
    });
};

//GET /api/organisation/:organisationId
//GET /api/organisation/:organisationId/user
//PUT /api/organisation/:organisationId/wish/