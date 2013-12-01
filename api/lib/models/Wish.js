var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./User');

var wishSchema = Schema({
    title:          { type: String, required: true },
    owner:          { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description:    { type: String },
    bought:         { type: Boolean, default: false },
    createDate:     { type: Date, default: Date.now}
});

wishSchema.pre('save', function(next) {
    console.log( 'save' );

    var wish = this;

    User.findById(this.owner).exec(function(error, user) {
        if(error) return next(error);

        user.wishes.push(wish);

        user.save(next);
    });
});

//TODO: remove wish from wishes list on remove

module.exports = mongoose.model('Wish', wishSchema);