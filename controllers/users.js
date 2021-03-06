const {response} = require('express');
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator');
const User = require('../models/user');
const { generateJWT } = require('../.vscode/helpers/jwt');


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

        const duplicateUsername = await User.findOne({username});


        if(duplicateEmail){
            return res.status(400).json({
                ok: false,
                msg: 'Email is already used'
            })
        }

        if(duplicateUsername){
            return res.status(400).json({
                ok: false,
                msg: 'Username is already taken'
            })
        }


        const user = new User(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //Guardar usuario
        await user.save();

        const token = await generateJWT(user.id);


        
        res.json({
            ok:true,
            user,
            token
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpeted error. See log for more info'
        });

    }


}

const updateUser = async(req, res = response) =>{
  
    const userId = req.params.id;
    
    
    try {

        const userDB = await User.findById(userId);

        if (!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'There is not user for the id sent.'
            });
        }


        //User Update

        const {password, google, email, ...fields} = req.body;


        if(userDB.email !== email){

            const emailUsed = await User.findOne({email});

            if( emailUsed){
                return res.status(400).json({
                    ok: false,
                    msg: 'Email is already used'
                });    
            } 

        }

        fields.email = email;

        const updatedUser = await User.findByIdAndUpdate(userId, fields, {new: true});

        res.json({
            ok:true,
            user: updatedUser
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpeted error. See log for more info'
        });
    }
    

}

const deleteUser = async(req, res = response) =>{
    const userId = req.params.id;

    try {
        
        const userDB = await User.findById(userId);

        if (!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'There is not user for the id sent.'
            });
        }

        const deleteUser = await User.findByIdAndDelete(userId);

        res.json({
            ok:true,
            msg: "Successfuly deleted user"
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
    createUser,
    updateUser,
    deleteUser
}