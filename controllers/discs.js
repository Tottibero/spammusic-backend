const {response} = require('express');
const {validationResult} = require('express-validator');
const Disc = require('../models/disc');
const Genre = require('../models/genre');
const Artist = require('../models/artist');
const { generateJWT } = require('../helpers/jwt');


const getDiscs = async(req, res) =>{

    const discs = await Disc.find()
                            .populate('genre', 'name')
                            .populate('artist', 'name');

    res.json({
        ok:true,
        discs
    });
};

const createDisc = async(req, res = response) =>{

    const uid = req.uid;


    const disc = new Disc({
        user: uid,
        ...req.body});



    try {

        const discDb = await disc.save();

        
        res.json({
            ok:true,
            discDb
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpeted error. See log for more info'
        });

    }


};

const updateDisc = async(req, res = response) =>{
        
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

const deleteDisc = async(req, res = response) =>{
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
    getDiscs,
    createDisc,
    updateDisc,
    deleteDisc
};