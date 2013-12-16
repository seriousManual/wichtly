var path = require('path');

var expect = require('chai').expect;
var sinon = require('sinon');

var Mail = require('../api/lib/mailer/Mail');

describe('Mail', function() {

    it('should', function(done) {
        var transport = {
            sendMail: sinon.stub().callsArg(1)
        };

        var myMailer = new Mail({
            transport: transport,
            templateDir: path.join(__dirname, 'testFiles/testTemplates'),
            from: 'foo@foo.com'
        });

        myMailer.sendMail('foo@bar.com', 'fooSubject', 'a', {world: 'world'}, function() {
            expect(transport.sendMail.args[0][0]).to.deep.equal({
                from: 'foo@foo.com',
                to: 'foo@bar.com',
                subject: 'fooSubject',
                text: 'hello world!'
            });

            done();
        });
    });

});