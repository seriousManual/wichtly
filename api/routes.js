var authorization = require('./middlewares/authorization');
var authorizator = require('./lib/authorization').create();
var errors = require('./lib/errors');

var data = [
    {
        id: 1,
        owner: 1,
        headline: 'fooHeadline',
        text: 'fooText',
        created: (new Date()).getTime(),
        bought: true
    },
    {
        id: 2,
        owner: 1,
        headline: 'fooHeadline2',
        text: 'fooText2',
        created: (new Date()).getTime(),
        bought: false
    },
    {
        id: 3,
        owner: 2,
        headline: 'bertHeadline',
        text: 'bertHeadline',
        created: (new Date()).getTime(),
        bought: false
    }
];

function install(app) {
    app.post('/api/authenticate', function(req, res, next) {
        authorizator.authorize(req, function(error, authorized) {
            if(!authorized) {
                return next(new errors.Unauthorized());
            }

            res.status(200);
            res.end();
        });
    });

    app.get('/api/wish', authorization, function(req, res, next) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(data));
        res.end();
    });

    app.get('/api/wish/:id', authorization, function(req, res, next) {
        var retData = data.filter(function(wish) { return wish.id == req.params.id; })[0];

        if(retData) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(retData));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
        }

        res.end();
    });

    app.use(function errorHandler(error, req, res, next) {
        console.log( error );
        if(!error.statusCode || !error.message) {
            error = new errors.InternalServerError();
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(error.statusCode, error.message);
    });
}

module.exports.install = install;

// GET /api/wish
// GET /api/wish/:id
// POST /api/wish/:id
// PUT /api/wish
// DELETE /api/wish

// GET /api/comment/:id
// GET /api/comment?wish=_wishId
// POST /api/comment/:id
// PUT /api/comment
// DELETE /api/comment

/*
    {
        id: 1,
        ownerId: 2,
        headLine: '',
        text: '',
        bought: false
    }
*/