var expect = require('chai').expect;
var sinon = require('sinon');

var TokenHandler = require('../api/lib/authorization/TokenHandler');

describe('tokenHandler', function() {
    var clock, t;
    beforeEach(function(){
        clock = sinon.useFakeTimers();
        t = new TokenHandler('foo', 1000);
    });

    afterEach(function() {
        clock.restore();
    });

    it('should generate a token', function() {
        expect(t.generateToken('f00')).to.equal('f00_0_69862933aa0f1aefda3d7500180e7bb063244f98');
    });

    it('should validate a token with the std ttl (success)', function() {
        clock.tick(50);
        expect(t.validate('f00_0_69862933aa0f1aefda3d7500180e7bb063244f98')).to.deep.equal({
            userId: 'f00',
            timeStamp: '0'
        });
    });

    it('should validate a token with the std ttl (fail)', function() {
        clock.tick(1500);
        expect(t.validate('f00_0_69862933aa0f1aefda3d7500180e7bb063244f98')).to.be.false;
    });

    it('should validate a token with custom ttl (success)', function() {
        clock.tick(1500);
        expect(t.validate('f00_0_69862933aa0f1aefda3d7500180e7bb063244f98', 2000)).to.deep.equal({
            userId: 'f00',
            timeStamp: '0'
        });
    });

    it('should validate a token with custom ttl (fail)', function() {
        clock.tick(1500);
        expect(t.validate('f00_0_69862933aa0f1aefda3d7500180e7bb063244f98', 1200)).to.be.false;
    });

    it('should fail with defect token', function() {
        expect(t.validate('foo')).to.be.false;
    });
});