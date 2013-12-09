var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wishSchema = Schema({
    title:          { type: String, required: true },
    description:    { type: String },
    bought:         { type: Boolean, default: false },
    createDate:     { type: Date, default: Date.now },
    creator:        { type: String, default: '' }
});

module.exports = {
    model: mongoose.model('Wish', wishSchema),
    schema: wishSchema
};