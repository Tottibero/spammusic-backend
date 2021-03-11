
const {response} = require('express');
const {validationResult} = require('express-validator');
const Artist = require('../models/artist');
const { generateJWT } = require('../helpers/jwt');


const getArtists  = async(req, res = response) =>{

    const artists = await Artist.find()
                                .populate('user', 'username');

    res.json({
        ok:true,
        artists
    });
}

const createArtist = async(req, res = response) =>{

    const uid = req.uid;

    const artist = new Artist({
        user: uid,
        ...req.body});


    try {
        
        const artistDb = await artist.save();

        res.json({
            ok:true,
            artist: artistDb
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpeted error. See log for more info'
        });

    }


};

const updateArtist = async(req, res = response) =>{
        
    try {

        res.json({
            ok:true,
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpeted error. See log for more info'
        });

    }
    
};

const deleteArtist = async(req, res = response) =>{
    const userId = req.params.id;

    try {
        

        res.json({
            ok:true,
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpeted error. See log for more info'
        });
    }
};

module.exports = {
    getArtists,
    createArtist,
    updateArtist,
    deleteArtist
};