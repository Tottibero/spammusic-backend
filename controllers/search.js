const {response} = require('express');

const Artist = require('../models/artist');
const Disc = require('../models/disc');
const User = require('../models/user');


const searchAll = async(req, res = response) =>{

    const query = req.params.query;

    const regex = new RegExp( query, 'i');


    const [artist, disc] = await Promise.all([
        Artist.find({name: regex}),
        Disc.find({title: regex})
    ]);

    res.json({
        ok:true,
        artist,
        disc
    });
};

const searchCollection = async(req, res = response) =>{

    const query = req.params.query;
    const colname = req.params.colname;

    const regex = new RegExp( query, 'i');

    let data = [];

    switch (colname) {
        case 'disc':
             data = await Disc.find({title: regex})
                              .populate('artist', 'name')
                              .populate('genre', 'name');
            break;
        case 'artist':
             data = await Artist.find({name: regex});
            break;
        case 'user':
             data = await User.find({username: regex});
            break;
    
    
        default:
           return res.status(400).json({
                ok: false,
                msg: 'There is not such collection in the DataBase'
            });
    }

    res.json({
        ok: true,
        results: data
    });


};

module.exports = {
    searchAll,
    searchCollection
};