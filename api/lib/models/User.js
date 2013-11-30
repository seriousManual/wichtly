var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    userName: { type: String, required: true, index: { unique: true } },
    mail:     { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);