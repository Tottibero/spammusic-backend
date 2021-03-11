/*
 Ruta: /api/artist
*/


const {Router} = require('express');
const {check} = require('express-validator');
const {validateFields} = require('../middlewares/validation-fields');
const {getArtists, createArtist, updateArtist, deleteArtist} = require('../controllers/artists');
const { validateJWT } = require('../middlewares/validation-jwt');

const router = Router();

router
.get( '/' , validateJWT, getArtists)
.post( '/' ,
[
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('audience', 'Name is required').not().isEmpty(),
    check('country', 'Name is required').not().isEmpty(),
    validateFields
    
], 
createArtist)
.put( '/:id' , 
[
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], 
updateArtist)
.delete('/:id', validateJWT, deleteArtist);



module.exports = router;