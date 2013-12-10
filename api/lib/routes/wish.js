var logger = require('../logger');
var routeLogger = require('../../middlewares/routeLogger');

var errors = require('../errors');
var d = require('debug')('wichtly:wish');

module.exports = function (app, authorization, wishLoader) {
    app.get('/api/user/:userId/wish', authorization, routeLogger('get', '/user/:userId/wish'), function (req, res, next) {
        var userId = req.params.userId;

        d('loading wishes: user %s', userId);
        logger.info({mod: 'wish', evt: 'wishLoad', user: userId});

        wishLoader.loadWishesByUserId(userId, function (error, result) {
            if (error) return next(error);

            res.send(200, result);
        });
    });

    app.get('/api/user/:userId/wish/:wishId', authorization, routeLogger('get', '/user/:userId/wish/:wishId'), function (req, res, next) {
        var userId = req.params.userId;
        var wishId = req.params.wishId;

        d('loading wish: user %s, wishId %s', userId, wishId);
        logger.info({mod: 'wish', evt: 'wishLoad', user: userId, wishId: wishId});

        wishLoader.loadWishByUserIdWishId(userId, wishId, function (error, result) {
            if (error) return next(new errors.NotFoundError('wish ' + wishId));

            res.send(200, result);
        });
    });

    app.put('/api/user/:userId/wish', authorization, routeLogger('put', '/user/:userId/wish'), function (req, res, next) {
        var title = req.body.title;
        var description = req.body.description;
        var userId = req.params.userId;
        var creator = req.WICHTLY.user.userName;

        d('creating wish: user %s, title: %s, description: %s', userId, title, description);
        logger.info({mod: 'wish', evt: 'wishCreate', user: userId});

        wishLoader.createWish(userId, title, description, creator, function (error, user) {
            if (error) return next(error);

            res.send(201);
        });
    });

    app.post('/api/user/:userId/wish/:wishId', authorization, routeLogger('post', '/user/:userId/wish/:wishId'), function (req, res, next) {
        var title = req.body.title || null;
        var description = req.body.description || null;
        var bought = req.body.bought !== undefined ? !!req.body.bought : null;
        var creator = req.body.creator !== undefined ? req.body.creator : null;
        var wishId = req.params.wishId;
        var userId = req.params.userId;

        d('updating wish: id: %s, title: %s, description: %s, bought: %s, creator: %s', wishId, title, description, bought, creator);
        logger.info({mod: 'wish', evt: 'wishEdit', user: userId, wishId: wishId});

        if (title || description) {
            if (userId != req.WICHTLY.user._id) {
                return next(new errors.Unauthorized('not your domain, sorry'));
            }
        }

        wishLoader.updateWish(userId, wishId, title, description, bought, creator, function (error) {
            if (error) return next(error);

            res.send(200);
        });
    });

    app.delete('/api/user/:userId/wish/:wishId', authorization.sameUser, routeLogger('delete', '/user/:userId/wish/:wishId'), function (req, res, next) {
        var wishId = req.params.wishId;
        var userId = req.params.userId;

        d('deleting wish: %s', wishId);
        logger.info({mod: 'wish', evt: 'wishDelete', user: userId, wishId: wishId});

        wishLoader.removeWish(userId, wishId, function (error, result) {
            if (error) return next(error);

            res.send(204);
        });
    });
};

// GET    /api/user/:userId/wish               get all wishes of user :userId
// GET    /api/user/:userId/wish/:wishId       get distinct wish :wishId of user :userId
// PUT    /api/user/:userId/wish               create wish for :userId
// POST   /api/user/:userId/wish/:wishId       update wish
// DELETE /api/user/:userId/wish/:wishId       delete wish