var UserModel = require('./models/User').model;

var errors = require('./errors');

function WishLoader(userLoader) {
    this._userLoader = userLoader;
}

WishLoader.prototype.loadWishesByUserId = function (userId, callback) {
    this._userLoader.loadUserById(userId, function(error, user) {
        if (error) return callback(error);

        if (!user) return callback(new errors.NotFoundError('user ' + userId));

        callback(null, user.wishes);
    });
};

WishLoader.prototype.loadWishByUserIdWishId = function (userId, wishId, callback) {
    this._loadWishByUserIdWishId(userId, wishId, function(error, user, wish) {
        callback(error, wish);
    });
};

WishLoader.prototype.createWish = function (userId, title, description, creator, callback) {
    this._userLoader.loadUserById(userId, function(error, user) {
        if (error) return callback(error);

        if (!user) return callback(new errors.NotFoundError('user ' + userId));

        user.wishes.push({
            title:title,
            description:description,
            creator: creator
        });

        user.save(callback);
    });
};

WishLoader.prototype.updateWish = function (userId, wishId, title, description, bought, creator, callback) {
    this._loadWishByUserIdWishId(userId, wishId, function(error, user, wish) {
        if(error) return callback(error);

        if (title !== null) wish.title = title;
        if (description !== null) wish.description = description;
        if (bought !== null) wish.bought = !!bought;
        if (creator !== null) wish.creator = creator;

        user.save(callback);
    });
};

WishLoader.prototype.removeWish = function (userId, wishId, callback) {
    this._loadWishByUserIdWishId(userId, wishId, function(error, user, wish) {
        if(error) return callback(error);

        wish.remove();

        user.save(callback);
    });
};

WishLoader.prototype.addComment = function (userId, wishId, creatorName, text, callback) {
    this._loadWishByUserIdWishId(userId, wishId, function(error, user, wish) {
        if(error) return callback(error);

        wish.comments.push({
            creatorName: creatorName,
            text: text
        });

        user.save(callback);
    });
};

WishLoader.prototype.removeComment = function (userId, wishId, commentId, callback) {
    this._loadWishByUserIdWishId(userId, wishId, function(error, user, wish) {
        if(error) return callback(error);

        wish.comments.id(commentId).remove();

        user.save(callback);
    });
};

WishLoader.prototype._loadWishByUserIdWishId = function(userId, wishId, callback) {
    this._userLoader.loadUserById(userId, function(error, user) {
        if (error) return callback(error);

        if (!user) return callback(new errors.NotFoundError('user ' + userId));

        var wish = user.wishes.id(wishId);

        if(!wish) return callback(new errors.NotFoundError('wish ' + wishId));

        callback(null, user, wish);
    });
};

module.exports = WishLoader;