var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orgaSchema = Schema({
    name: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [
        { type: Schema.Types.ObjectId, ref: 'User' }
    ],
    createDate: { type: Date, default: Date.now}
});

module.exports = {
    schema: orgaSchema,
    model: mongoose.model('Organisation', orgaSchema)
};