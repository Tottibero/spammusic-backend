const {Schema, model} = require('mongoose');


const ArtistSchema = Schema({

    name: {
        type: String,
        required: true,
    },
    audience: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    img: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});




module.exports = model('Artist', ArtistSchema);