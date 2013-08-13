var data = [
    {
        id: 1,
        owner: 'foo',
        headline: 'fooHeadline',
        text: 'fooText',
        created: (new Date()).getTime(),
        bought: true
    },
    {
        id: 2,
        owner: 'foo',
        headline: 'fooHeadline2',
        text: 'fooText2',
        created: (new Date()).getTime(),
        bought: false
    },
    {
        id: 3,
        owner: 'bert',
        headline: 'bertHeadline',
        text: 'bertHeadline',
        created: (new Date()).getTime(),
        bought: false
    }
];

function install(app) {
    app.get('/api/wish', function(req, res, next) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(data));
        res.end();
    });

    app.get('/api/wish/:id', function(req, res, next) {
        var retData = data.filter(function(wish) { return wish.id == req.params.id; })[0];

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(retData));
        res.end();
    });
}

module.exports.install = install;

// GET /api/wish
// GET /api/wish/:id
// POST /api/wish/:id
// PUT /api/wish
// DELETE /api/wish

/*
        {
            id: 1,
            ownerId: 2,
            headLine: '',
            text: '',
            bought: false
        }
*/