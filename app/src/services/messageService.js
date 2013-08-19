var angular = require('../lib/angular');

function MessageService($timeout) {
    this._data = [];
    this._$timeout = $timeout;
}

MessageService.prototype.error = function(headline, message) {
    this._write('danger', headline, message);
};

MessageService.prototype.info = function(headline, message) {
    this._write('info', headline, message);
};

MessageService.prototype.ok = function(headline, message) {
    this._write('success', headline, message);
};

MessageService.prototype._write = function(what, headline, message) {
    var _mssg, _headline, that = this;
    if(!message) {
        _mssg = headline;
        _headline = what;
    } else {
        _mssg = message;
        _headline = headline;
    }

    this._data.push({
        what: what,
        headline: _headline,
        message: _mssg
    });
};

MessageService.prototype.data = function() {
    return this._data;
};

module.exports.install = function(app) {
    app.service('messageService', MessageService);
};