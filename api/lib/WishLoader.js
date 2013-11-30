var Wish = require('./models/Wish');

function WishLoader() {}

WishLoader.prototype.loadWishes = function(callback) {
    this._query({}, callback);
};

WishLoader.prototype.loadWishByWishId = function(wishId, callback) {
    this._query({_id: wishId}, callback);
};

WishLoader.prototype.loadWishesByUserId = function(userId, callback) {
    this._query({user: userId}, callback);
};

WishLoader.prototype.loadWishByUserIdWishId = function(userId, wishId, callback) {
    this._query({user: userId, _id: wishId}, callback);
};

WishLoader.prototype._query = function(query, callback) {
    var that = this;
    Wish.find(query).exec(function(error, result) {
        that._handle(error, result, callback);
    });
};

WishLoader.prototype._handle = function(error, result, callback) {
    if(error) {
        return callback(error, null);
    }

    if(!result) {
        return callback(null, null);
    }

    callback(null, result);
};

module.exports = WishLoader;