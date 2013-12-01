var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    userName: { type: String, required: true, index: { unique: true } },
    mail:     { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    wishes:   [ { type: mongoose.Schema.Types.ObjectId, ref: 'Wish' } ]
});

module.exports = mongoose.model('User', userSchema);