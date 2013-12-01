var errors = require('../errors');
var d = require('debug')('wichtly:wish');

module.exports = function (app, authorization, wishLoader) {
    app.get('/api/wish/:wishId?', authorization, function (req, res, next) {
        var wishId = req.params.wishId;

        d('loading %s', wishId ? 'wish ' + wishId : 'all wishes');

        query(wishLoader, null, wishId || null, function (error, result) {
            if (error) return next(error);

            res.send(200, result);
        });
    });

    app.get('/api/user/:userId/wish/:wishId?', authorization, function (req, res, next) {
        var userId = req.params.userId;
        var wishId = req.params.wishId;

        d('loadin wish: user %s, %s', userId, wishId ? 'wish ' + wishId : 'all wishes');

        query(wishLoader, userId, wishId || null, function (error, result) {
            if (error) return next(error);

            res.send(200, result);
        });
    });

    app.put('/api/user/:userId/wish', authorization, function (req, res, next) {
        var title = req.body.title;
        var description = req.body.description;
        var userId = req.params.userId;

        d('creating wish: user %s, title: %s, description: %s', userId, title, description);

        wishLoader.createWish(title, userId, description, function(error, createdWish) {
            if(error) return next(error);

            res.send(201, createdWish);
        });
    });

    app.post('/api/user/:userId/wish/:wishId', authorization.sameUser, function (req, res, next) {
        var title = req.body.title;
        var description = req.body.description;
        var bought = req.body.bought;
        var wishId = req.params.wishId;

        d('updating wish: id: %s, title: %s, description: %s, bought: %s', wishId, title, description, bought);

        wishLoader.updateWish(wishId, title, description, bought, function(error, updatedWish) {
            if(error) return next(error);

            if(!updatedWish) return next(new errors.NotFoundError('wish ' + wishId));

            res.send(200, updatedWish);
        });
    });

    app.delete('/api/user/:userId/wish/:wishId', authorization.sameUser, function(req, res, next) {
        var wishId = req.params.wishId;

        d('deleting wish: %s', wishId);

        wishLoader.removeWish(wishId, function(error, result) {
            if(error) return next(error);

            if(!result) {
                return next(new errors.NotFoundError('wish ' + wishId));
            }

            res.send(204, {}); //TODO: what to return in the body?
        });
    });
};

function query(wishLoader, userId, wishId, callback) {
    if (userId && wishId) {
        wishLoader.loadWishByUserIdWishId(userId, wishId, function (error, result) {
            _handle(error, result, true, callback);
        });
    } else if (userId) {
        wishLoader.loadWishesByUserId(userId, function (error, result) {
            _handle(error, result, true, callback);
        });
    } else if (wishId) {
        wishLoader.loadWishByWishId(wishId, function (error, result) {
            _handle(error, result, true, callback);
        });
    } else {
        wishLoader.loadWishes(function (error, result) {
            _handle(error, result, true, callback);
        });
    }

}

function _handle(error, result, listQuery, callback) {
    if (error) return callback(error, null);

    if (result.length === 0) {
        if(listQuery) {
            return callback(error, []);
        } else {
            return callback(new errors.NotFoundError('wish'), null);
        }
    }

    callback(null, result);
}

// GET /api/wish/:wishId?                    get all wishes or wish :wishId
// GET /api/user/:userId/wish/:wishId?       get distinct wish :wishId of user :userId or all wishes of :userId
// PUT /api/user/:userId/wish                create wish for :userId
// POST /api/user/:userId/wish/:wishId       update wish