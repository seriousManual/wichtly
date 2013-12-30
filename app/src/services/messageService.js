var angular = require('../lib/angular');

function MessageService($rootScope) {
    this._data = [];
    this._$rootScope = $rootScope;
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

    this._$rootScope.$broadcast('message', {
        what: what,
        headline: _headline,
        message: _mssg
    });
};

MessageService.prototype.waitStart = function() {
    this._$rootScope.$broadcast('messageWait', true);
};

MessageService.prototype.waitEnd = function() {
    this._$rootScope.$broadcast('messageWait', false);
};

module.exports.install = function(app) {
    app.service('messageService', MessageService);
};