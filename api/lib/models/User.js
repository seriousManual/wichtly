var mongoose = require('mongoose');
var WishSchema = require('./Wish').schema;

var userSchema = mongoose.Schema({
    userName: { type: String, required: true, index: { unique: true } },
    mail: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    wishes: [ WishSchema ]
});

module.exports = {
    schema: userSchema,
    model: mongoose.model('User', userSchema)
};