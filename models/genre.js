const {Schema, model} = require('mongoose');


const GenreSchema = Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    }

});




module.exports = model('Genre', GenreSchema);