const {response} = require('express');
const {validationResult} = require('express-validator');
const Genre = require('../models/genre');
const { generateJWT } = require('../helpers/jwt');


const getGenres = async(req, res) =>{

    const from = Number(req.query.from) || 0;
    


    const [genres, total] =  await Promise.all([
        Genre.find()
        .skip(from)
        .limit(5),
        Genre.countDocuments()
    ]);
    
    res.json({
        ok:true,
        total,
        genres
    });
};

const createGenre = async(req, res = response) =>{

    const uid = req.uid;

    const genre = new Genre({
        user: uid,
        ...req.body});


    try {
     
        const genreDb = await genre.save();
        
        res.json({
            ok:true,
            genre: genreDb
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpeted error. See log for more info'
        });

    }


}

const updateGenre = async(req, res = response) =>{
    
    const genreId = req.params.id;
    const uid = req.uid;

    try {

        const genreDb = await Genre.findById();

        if (!genreDb){
            res.status(500).json({
                ok: false,
                msg: 'Genre not founded for that ID'
            });
    
        }

        const genreChanges = {
            ...req.body,
            user: uid
        }

        const genreUpdated = await Genre.findByIdAndUpdate(genreId, genreChanges, {new:true});

        res.json({
            ok:true,
            genre: genreUpdated
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpeted error. See log for more info'
        });
    }
    

};

const deleteGenre = async(req, res = response) =>{

    const genreId = req.params.id;

    try {
        
        const genreDb = await Genre.findById();

        if (!genreDb){
            res.status(500).json({
                ok: false,
                msg: 'Genre not founded for that ID'
            });
    
        }

        await Genre.findByIdAndDelete(genreId);

        res.json({
            ok:true,
            msg: 'Deleted genre.'
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
    getGenres,
    createGenre,
    updateGenre,
    deleteGenre
};