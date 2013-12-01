var Wish = require('./models/Wish');

function WishLoader() {}

WishLoader.prototype.loadWishes = function(callback) {
    this._query({}, true, callback);
};

WishLoader.prototype.loadWishByWishId = function(wishId, callback) {
    this._query({_id: wishId}, false, callback);
};

WishLoader.prototype.loadWishesByUserId = function(userId, callback) {
    this._query({owner: userId}, true, callback);
};

WishLoader.prototype.loadWishByUserIdWishId = function(userId, wishId, callback) {
    this._query({owner: userId, _id: wishId}, false, callback);
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

WishLoader.prototype.removeWish = function(wishId, callback) {
    Wish.findById(wishId, function(error, loadedWish) {
        if(error) return callback(error, null);

        if(!loadedWish) return callback(null, false);

        loadedWish.remove(function(error) {
            if(error) return callback(error, null);

            callback(null, true);
        });
    });
};

WishLoader.prototype._query = function(query, listQuery, callback) {
    var that = this;
    Wish
            .find(query)
            .populate('owner', 'userName')
            .exec(function(error, result) {
                that._handle(error, result, listQuery, callback);
            });
};

WishLoader.prototype._handle = function(error, result, listQuery, callback) {
    if(error) {
        return callback(error, null);
    }

    if(!result) {
        return callback(null, null);
    }

    if(!listQuery) {
        result = result[0];
    }

    callback(null, result);
};

module.exports = WishLoader;