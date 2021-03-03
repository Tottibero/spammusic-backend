const {response} = require('express');
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator');
const User = require('../models/user');


const getUsers = async(req, res) =>{

    const users = await User.find({}, 'username email role google');
    res.json({
        ok:true,
        users
    });
}

const createUser = async(req, res = response) =>{

    const {username, email, password} = req.body;


    try {

        const duplicateEmail = await User.findOne({email});

        if(duplicateEmail){
            return res.status(400).json({
                ok: false,
                msg: 'Email is already used'
            })
        }

        const user = new User(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar usuario
        await user.save();

        
        res.json({
            ok:true,
            user
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
    getUsers,
    createUser
}