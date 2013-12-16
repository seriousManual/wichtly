var Events = require('./models/Events').model;

function LoggingService() {

}

LoggingService.prototype.logAdd = function (organisationId, creatorName, wishId, wishTitle, callback) {
    this._log('adds', organisationId, creatorName, wishId, wishTitle, callback);
};

LoggingService.prototype.logEdit = function (organisationId, creatorName, wishId, wishTitle, callback) {
    this._log('edits', organisationId, creatorName, wishId, wishTitle, callback);
};

LoggingService.prototype.logDelete = function (organisationId, creatorName, wishId, wishTitle, callback) {
    this._log('deletes', organisationId, creatorName, wishId, wishTitle, callback);
};

LoggingService.prototype.logComment = function (organisationId, creatorName, wishId, commentText, callback) {
    this._log('comments', organisationId, creatorName, wishId, commentText, callback);
};

LoggingService.prototype._log = function (logKind, organisationId, creatorName, wishId, assetText, callback) {
    if(!callback) callback = function() {};

    var event = {
        creatorName: creatorName,
        wishId: wishId,
        assetText: assetText
    };

    Events
        .find({organisationId: organisationId})
        .exec(function (error, result) {
            if (error) return callback(error);

            var events;
            if (result.length === 0)  {
                events = new Events({organisationId: organisationId});
            } else {
                events = result[0];
            }

            events[logKind].push(event);

            events.save(callback);
        });
};

module.exports = LoggingService;