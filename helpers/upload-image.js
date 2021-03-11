
const fs = require('fs');

const User = require('../models/user');
const Artist = require('../models/artist');
const Disc = require('../models/disc');

const deleteImage = async (path) => {
    if(fs.existsSync(path)){
        fs.unlinkSync(path);
    }
}


const uploadImage = async (type, id, fileName) => {

    switch (type) {
        case 'artists':
            const artist = await Artist.findById(id);
            if(!artist){
                console.log('No artist found for id');
                return false;
            }

            const oldPathArtist = `./uploads/artists/${artist.img}`;
            deleteImage(oldPathArtist);

            artist.img = fileName;
            artist.save();
            return true;
            
        case 'discs':
            const disc = await Disc.findById(id);
            if(!disc){
                console.log('No disc found for id');
                return false;
            }

            const oldPathDisc = `./uploads/discs/${disc.img}`;
            deleteImage(oldPathDisc);

            disc.cover = fileName;
            disc.save();
            return true;

        case 'users':
            const user = await User.findById(id);
            if(!user){
                console.log('No user found for id');
                return false;
            }

            const oldPathUser = `./uploads/users/${user.img}`;
            deleteImage(oldPathUser);

            user.img = fileName;
            user.save();
            return true;
    }


};


module.exports = {
    uploadImage
};