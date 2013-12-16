var fs = require('fs');
var path = require('path');

var dust = require('dustjs-linkedin');

function Mailer(options) {
    options = options || {};

    this._mailTransport = options.transport;
    this._templateDir = options.templateDir || '';

    this._from = options.from;

    this._templateCache = {};
}

Mailer.prototype.sendMail = function(to, subject, template, data, callback) {
    if(!callback) callback = function() {};

    var that = this;
    var compiled = this._getTemplate(template);

    compiled(data, function(error, rendered) {
        if(error) return callback(error);

        that._mailTransport.sendMail({
            from: that._from,
            to: to,
            subject: subject,
            text: rendered
        }, callback);
    });
};

Mailer.prototype._getTemplate = function(templateName) {
    if(this._templateCache[templateName]) return this._templateCache[templateName];

    var templateContent = fs.readFileSync(path.join(this._templateDir, templateName + '.dust'), 'utf8');

    var compiled = dust.compileFn(templateContent);

    this._templateCache[templateName] = compiled;

    return compiled;
};

module.exports = Mailer;