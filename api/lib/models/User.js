var util = require('util');

var mongoose = require('mongoose');
var crypto = require('crypto');

var WishSchema = require('./Wish').schema;
var createRandomString = require('../util/randomString');

var userSchema = mongoose.Schema({
    userName: { type: String, required: true, index: { unique: true } },
    mail: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    salt: { type: String },
    wishes: [ WishSchema ],
    organisation: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation' }
});

userSchema.pre('save', function (next) {
    var user = this;

    if (!user.salt) user.salt = createRandomString(15);
    if (!user.isModified('password')) return next();

    user.password = createHash(user.salt, user.password);

    next();
});

userSchema.methods.checkPassword = function(candidatePassword) {
    return verifyLogin(this, candidatePassword);
};

module.exports = {
    schema: userSchema,
    model: mongoose.model('User', userSchema)
};

function createHash(salt, password) {
    var shasum = crypto.createHash('sha1');

    var schema = util.format('%s_%s', salt, password);
    shasum.update(schema);

    return shasum.digest('hex');
}

function verifyLogin(user, password) {
    var testHash = createHash(user.salt, password);

    return testHash === user.password;
}