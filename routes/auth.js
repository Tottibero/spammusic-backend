/*
 Ruta: /api/login
*/


const {Router} = require('express');
const {login, renewToken, googleSign} = require('../controllers/auth');
const {check} = require('express-validator');
const {validateFields} = require('../middlewares/validation-fields');
const {validateJWT} = require('../middlewares/validation-jwt')
const router = Router();


router.post('/',
[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
],
login
)
.post('/google',
[
    check('token', 'Token is required').not().isEmpty(),
    validateFields
],
googleSign
)
.get('/renew', [
    validateJWT
], 
renewToken
);




module.exports = router;