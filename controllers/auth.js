const {response} = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../.vscode/helpers/jwt');


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

}


module.exports = {
    login
}
