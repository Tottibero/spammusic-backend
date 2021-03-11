const {response} = require('express');
const {validationResult} = require('express-validator');
const Genre = require('../models/genre');
const { generateJWT } = require('../helpers/jwt');


const getGenres = async(req, res) =>{

    const from = Number(req.query.from) || 0;
    

    // const genres = await Genre.find()
    //                           .skip(from)
    //                           .limit(5);

    // const total = await Genre.count();

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
    

}

const deleteGenre = async(req, res = response) =>{
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
}

module.exports = {
    getGenres,
    createGenre,
    updateGenre,
    deleteGenre
}