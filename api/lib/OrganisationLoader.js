var Organisation = require('./models/Organisation').model;
var errors = require('./errors');

function OrganisationLoader() {
}

OrganisationLoader.prototype.loadOrganisation = function (organisationId, callback) {
    Organisation
        .findById(organisationId)
        .populate('creator', 'userName')
        .populate('members')
        .exec(function (error, organisation) {
            if (error) return callback(error, null);

            if (!organisation) return callback(new errors.NotFoundError('organisation ' + organisationId), null);

            callback(null, organisation);
        });
};

OrganisationLoader.prototype.createOrganisation = function (name, callback) {
    var tmp = new Organisation({name: name});

    tmp.save(callback);
};

OrganisationLoader.prototype.addUser = function (organisationId, user, callback) {
    Organisation
        .findById(organisationId)
        .exec(function (error, organisation) {
            if(error) return callback(error, null);

            if (!organisation) return callback(new errors.NotFoundError('organisation ' + organisationId), null);

            organisation.members.push(user);

            organisation.save(callback);
        });
};

module.exports = OrganisationLoader;