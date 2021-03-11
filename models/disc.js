const {Schema, model} = require('mongoose');


const DiscSchema = Schema({

    title: {
        type: String,
        required: true,
    },
    release: {
        type: Date,
        required: true,
    },
    link: {
        type: String,
    },
    cover: {
        type: String
    },
     description: {
        type: String,
    },
    artist: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Artist'
    },
    genre: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Genre'
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

});




module.exports = model('Disc', DiscSchema);