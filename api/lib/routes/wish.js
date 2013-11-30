var errors = require('../errors');
var d = require('debug')('wichtly:wish');

module.exports = function (app, authorization, wishLoader) {
    app.get('/api/wish/:wishId?', authorization, function (req, res, next) {
        var wishId = req.params.wishId;

        d(wishId ? 'wish ' + wishId : 'all wishes');

        foo(wishLoader, null, wishId || null, function(error, result) {
            if(error) return next(error);

            res.send(200, result);
        });
    });

    app.get('/api/user/:userId/wish/:wishId?', authorization, function (req, res, next) {
        var userId = req.params.userId;
        var wishId = req.params.wishId;

        d('user: %s, %s', userId, wishId ? 'wish ' + wishId : 'all wishes');

        foo(wishLoader, userId, wishId || null, function(error, result) {
            if(error) return next(error);

            res.send(200, result);
        });
    });
};

function foo(wishLoader, userId, wishId, callback) {
    if (userId && wishId) {
        wishLoader.loadWishesByUserIdWishId(userId, wishId, function (error, result) {
            if (error) return callback(error, null);

            if(!result) return callback(error, []);

            callback(null, result);
        });
    } else if (userId) {
        wishLoader.loadWishesByUserId(userId, function (error, result) {
            if (error) return callback(error, null);

            if(!result) return callback(error, []);

            callback(null, result);
        });
    } else if (wishId) {
        wishLoader.loadWishByWishId(wishId, function (error, result) {
            if (error) return callback(error, null);

            if(result.length === 0) return callback(new errors.NotFoundError('wish ' + wishId), null);

            callback(null, result);
        });
    } else {
        wishLoader.loadWishes(function (error, result) {
            if (error) return callback(error, null);

            if(!result) return callback(error, []);

            callback(null, result);
        });
    }

}

// GET /api/wish/:wishId?                    get all wishes or wish :wishId
// GET /api/user/:userId/wish/:wishId?       get distinct wish :wishId of user :userId or all wishes of :userId