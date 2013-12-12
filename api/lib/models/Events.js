var mongoose = require('mongoose');

var schema = mongoose.Schema;

var eventSchema = schema({
    creatorName:    { type: String },
    creatorId:      { type: schema.Types.ObjectId, ref: 'User' },
    wishId:         { type: schema.Types.ObjectId, ref: 'Wish' },
    createDate:     { type: Date, default: Date.now },
    seen:           { type: Boolean, default: false },
    mailed:         { type: Boolean, default: false }
});

var eventsSchema = schema({
    userId:             { type: schema.Types.ObjectId, required: true, index: { unique: true }, ref: 'User' },
    adds:               [ eventSchema ],
    edits:              [ eventSchema ],
    deletes:            [ eventSchema ],
    commentOnWish:      [ eventSchema ],
    commentOnCommented: [ eventSchema ]
});

module.exports = {
    schema: eventsSchema,
    model: mongoose.model('Events', eventsSchema)
};