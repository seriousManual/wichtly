var Wish = require('./models/Wish');

function WishLoader() {}

WishLoader.prototype.loadWishes = function(callback) {
    this._query({}, callback);
};

WishLoader.prototype.loadWishByWishId = function(wishId, callback) {
    this._query({_id: wishId}, callback);
};

WishLoader.prototype.loadWishesByUserId = function(userId, callback) {
    this._query({owner: userId}, callback);
};

WishLoader.prototype.loadWishByUserIdWishId = function(userId, wishId, callback) {
    this._query({owner: userId, _id: wishId}, callback);
};

WishLoader.prototype.createWish = function(title, owner, description, callback) {
    var newWish = new Wish({title: title, owner: owner, description: description});

    newWish.save(function(error, wish) {
        if(error) return callback(error, null);

        callback(null, wish);
    });
};

WishLoader.prototype.updateWish = function(wishId, title, description, bought, callback) {
    var update = {};

    if(title !== undefined) update.title = title;
    if(description !== undefined) update.description = description;
    if(bought !== undefined) update.bought = !!bought;

    Wish.findByIdAndUpdate(wishId, update, callback);
};

WishLoader.prototype._query = function(query, callback) {
    var that = this;
    Wish
            .find(query)
            .populate('owner', 'userName')
            .exec(function(error, result) {
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