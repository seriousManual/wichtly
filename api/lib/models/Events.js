var mongoose = require('mongoose');

var schema = mongoose.Schema;

var EventSchema = schema({
    creatorName:    { type: String },
    wishId:         { type: schema.Types.ObjectId, ref: 'Wish' },
    createDate:     { type: Date, default: Date.now },
    assetText:      { type: String }
});

var eventsSchema = schema({
    organisationId:     { type: schema.Types.ObjectId, required: true, index: { unique: true }, ref: 'Organisation' },
    adds:               [ EventSchema ],
    edits:              [ EventSchema ],
    deletes:            [ EventSchema ],
    comments:           [ EventSchema ]
});

module.exports = {
    schema: eventsSchema,
    model: mongoose.model('Events', eventsSchema)
};