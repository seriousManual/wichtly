var crypto = require('crypto');
var util = require('util');

var d = require('debug')('wichtly:tokenHandler');

var TOKEN_PATTERN = /([a-f0-9]+)_(\d+)_([a-f0-9]+)/;

function TokenHandler(secret, ttl) {
    this._secret = secret;
    this._ttl = ttl;
}

TokenHandler.prototype.generateToken = function(userId) {
    return this._generateToken(userId, Date.now());
};

TokenHandler.prototype.validate = function (token, ttl) {
    var matches = token.match(TOKEN_PATTERN);

    d('validating: %s', token);

    if (!matches) {
        return false;
    }

    var authUserId = matches[1];
    var authTimestamp = matches[2];

    var genToken = this._generateToken(authUserId, authTimestamp);

    if (genToken !== token) {
        d('no token match: %s <-> %s', genToken, token);
        return false;
    }

    var now = Date.now();
    if (!ttl) {
        ttl = this._ttl;
    }

    if(now > authTimestamp + ttl) {
        d('timeout, timestamp: %d, ttl: %d', authTimestamp, ttl);
        return false;
    } else {
        return {
            userId: authUserId,
            timeStamp: authTimestamp
        };
    }
};

TokenHandler.prototype._generateToken = function (userId, timeStamp) {
    var publicPart = util.format('%s_%s', userId, timeStamp);

    var shasum = crypto.createHash('sha1');
    shasum.update(util.format('%s_%s', publicPart, this._secret));
    var privatePart = shasum.digest('hex');

    return util.format('%s_%s', publicPart, privatePart);
};

module.exports = TokenHandler;