var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wishSchema = Schema({
    title:          { type: String, required: true },
    owner:          { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description:    { type: String },
    bought:         { type: Boolean, default: false },
    createDate:     { type: Date, default: Date.now}
});

module.exports = mongoose.model('Wish', wishSchema);