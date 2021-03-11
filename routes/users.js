/*
 Ruta: /api/users
*/


const {Router} = require('express');
const {check} = require('express-validator');
const {validateFields} = require('../middlewares/validation-fields')
const {getUsers, createUser, updateUser, deleteUser} = require('../controllers/users');
const { validateJWT } = require('../middlewares/validation-jwt');

const router = Router();

router
.get( '/' , validateJWT, getUsers)
.post( '/' ,
[
    validateJWT,
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    validateFields
    
], 
createUser)
.put( '/:id' , 
[
    validateJWT,
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    validateFields
], 
updateUser)
.delete('/:id', validateJWT, deleteUser);



module.exports = router;