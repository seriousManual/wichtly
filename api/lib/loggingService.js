var Events = require('./models/Events');

function LoggingService() {

}

LoggingService.prototype.logAdd = function (creatorName, creatorId, wishId, wishOwnerId, callback) {
    this._log('adds', creatorName, creatorId, wishId, wishOwnerId, true, callback);
};

LoggingService.prototype.logEdit = function (creatorName, creatorId, wishId, wishOwnerId, callback) {
    this._log('adds', creatorName, creatorId, wishId, wishOwnerId, true, callback);
};

LoggingService.prototype.logDelete = function (creatorName, creatorId, wishId, wishOwnerId, callback) {
    this._log('adds', creatorName, creatorId, wishId, wishOwnerId, true, callback);
};

LoggingService.prototype.logComment = function (creatorName, creatorId, wishId, wishOwnerId, callback) {
    this._logComment('commentOnWish', creatorName, creatorId, wishId, wishOwnerId, true, callback);
};

LoggingService.prototype._logComment = function(commentLogKind, userId, creatorName, creatorId, wishId, callback) {
    var that = this;

    //get all comments to the wish
    //call _log serveral times on each commentER
    var commenters = [];

    commenters.forEach(function(commenter) {
        that._log('commentOnWish | commentOnCommented', commenter._id, creatorName, creatorId, wishId, false, callback);
    });
};

LoggingService.prototype._log = function (kind, userId, creatorName, creatrId, wishId, logToOrganisation, callback) {

};

module.exports = LoggingService;