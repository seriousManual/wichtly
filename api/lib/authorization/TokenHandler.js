var crypto = require('crypto');
var util = require('util');

var TOKEN_PATTERN = /(\d+)_(\d+)_([a-f0-9]+)/;

function TokenHandler(secret, ttl) {
    this._secret = secret;
    this._ttl = ttl;
}

TokenHandler.prototype.generateToken = function(userId) {
    return this._generateToken(userId, Date.now());
};

TokenHandler.prototype.validate = function (token, ttl) {
    var matches = token.match(TOKEN_PATTERN);

    if (!matches) {
        return false;
    }

    var authUserId = matches[1];
    var authTimestamp = parseInt(matches[2], 10);

    var genToken = this._generateToken(authUserId, authTimestamp);

    if (genToken !== token) {
        return false;
    }

    var now = Date.now();
    if (!ttl) {
        ttl = this._ttl;
    }

    return now < authTimestamp + ttl;
};

TokenHandler.prototype._generateToken = function (userId, timeStamp) {
    var publicPart = util.format('%d_%d', userId, timeStamp);

    var shasum = crypto.createHash('sha1');
    shasum.update(util.format('%s_%s', publicPart, this._secret));
    var privatePart = shasum.digest('hex');

    return util.format('%s_%s', publicPart, privatePart);
};

module.exports = TokenHandler;