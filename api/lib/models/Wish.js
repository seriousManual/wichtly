var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    title:          { type: String, required: true },
    user:           { type: String, required: true},
    description:    { type: String },
    bought:         { type: Boolean, default: false },
    createDate:     { type: Date, default: Date.now}
});

module.exports = mongoose.model('Wish', userSchema);