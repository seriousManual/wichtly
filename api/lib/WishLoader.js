var UserModel = require('./models/User').model;

var errors = require('./errors');

function WishLoader() {
}

WishLoader.prototype.loadWishesByUserId = function (userId, callback) {
    UserModel.findById(userId, function (error, user) {
        if (error) return callback(error);

        if (!user) return callback(new errors.NotFoundError('user ' + userId));

        callback(null, user.wishes);
    });
};

WishLoader.prototype.loadWishByUserIdWishId = function (userId, wishId, callback) {
    UserModel.findById(userId, function (error, user) {
        if (error) return callback(error);

        if (!user) return callback(new errors.NotFoundError('user ' + userId));

        var wish = user.wishes.id(wishId);

        if(!wish) return callback(new errors.NotFoundError('wish ' + wishId));

        callback(null, wish);
    });
};

WishLoader.prototype.createWish = function (userId, title, description, creator, callback) {
    UserModel.findById(userId, function (error, user) {
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
    UserModel.findById(userId, function (error, user) {
        if (error) return callback(error);

        if (!user) return callback(new errors.NotFoundError('user ' + userId));

        var wish = user.wishes.id(wishId);

        if (wish) {
            if (title !== null) wish.title = title;
            if (description !== null) wish.description = description;
            if (bought !== null) wish.bought = !!bought;
            if (creator !== null) wish.creator = creator;

            user.save(callback);
        } else {
            callback(new errors.NotFoundError('wish ' + wishId));
        }
    });
};

WishLoader.prototype.removeWish = function (userId, wishId, callback) {
    UserModel.findById(userId, function (error, user) {
        if (error) return callback(error, null);

        if (!user) return callback(new errors.NotFoundError('user ' + userId));

        var wish = user.wishes.id(wishId);

        if (wish) {
            wish.remove();

            user.save(callback);
        } else {
            callback(new errors.NotFoundError('wish ' + wishId));
        }
    });
};

WishLoader.prototype.addComment = function (userId, wishId, creatorName, text, callback) {
    UserModel.findById(userId, function (error, user) {
        if (error) return callback(error, null);

        if (!user) return callback(new errors.NotFoundError('user ' + userId));

        var wish = user.wishes.id(wishId);

        if (wish) {
            wish.comments.push({
                creatorName: creatorName,
                text: text
            });

            user.save(callback);
        } else {
            callback(new errors.NotFoundError('wish ' + wishId));
        }
    });
};

module.exports = WishLoader;