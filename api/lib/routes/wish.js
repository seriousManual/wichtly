var authorization = require('../../middlewares/authorization');

var data = [];

module.exports = function(app) {
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
};

// GET /api/wish            retrieve all wishes
// GET /api/wish/:id        get distinct wish
// POST /api/wish/:id       edit distinct wish
// PUT /api/wish            create wish
// DELETE /api/wish/:id     delete distinct wish