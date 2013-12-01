var Organisation = require('./models/Organisation');
var Wish = require('./models/Wish');

function OrganisationLoader(wishLoader) {}

OrganisationLoader.prototype.loadOrganisation = function (organisationId, callback) {
    var that = this;

    Organisation
            .findById(organisationId)
            .populate('creator', 'userName')
            .populate('members', 'userName wishes')
            .populate('members.wishes')
            .exec(function (error, result) {
                that._handle(error, result, callback);
            });
};

OrganisationLoader.prototype._handle = function (error, organisation, callback) {
    if (error) {
        return callback(error, null);
    }

    if (!organisation) {
        return callback(null, null);
    }

    callback(null, organisation);
};

module.exports = OrganisationLoader;