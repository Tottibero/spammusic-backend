const {response} = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const user = require('../models/user');


const login = async(req, res = response) =>{

    const {email, password} = req.body;

    try {

        const userDb = await User.findOne({email});

        if (!userDb){
            return res.status(404).json({
                ok: false,
                msg: 'There is not user for the email sent or password is incorrect.'
            });
        }

        const validPassword = bcrypt.compareSync(password, userDb.password);

        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'There is not user for the email sent or password is incorrect.'
            });
        }
        
        const token = await generateJWT(userDb.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpeted error. See log for more info'
        });
        
    }

};

const renewToken = async(req, res = response) =>{

    const uid = req.uid;

const token = await generateJWT(uid);    

    res.json({
        ok:true,
        token
    });

};

const googleSign = async(req, res = response) =>{

    const googleToken = req.body.token;

    try {

        const {name, email, picture} = await googleVerify(googleToken);
        
        let user;

        let username = name.replace(/\s/g, '.').toLowerCase();

        const userMailDB = await User.findOne({email});

        const usernameDB = await User.findOne({username});

        if(!userMailDB && !username){
        } else{
            user = userMailDB;
            user.google = true;
        }

        user.save();

        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            msg: 'google',
            usernameDB, email, picture, token
        });



    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token is not correct'
        });
    }


};

module.exports = {
    login,
    renewToken,
    googleSign
};
