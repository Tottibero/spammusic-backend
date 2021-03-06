const {Schema, model} = require('mongoose');


const UserSchema = Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'

    },
    google: {
        type: Boolean,
        default: false
    }

});


UserSchema.method('toJSON', function(){
    const{password, ...object} = this.toObject();
    return object;
});


module.exports = model('User', UserSchema);