/*
 Ruta: /api/genre
*/


const {Router} = require('express');
const {check} = require('express-validator');
const {validateFields} = require('../middlewares/validation-fields');
const {getGenres, createGenre, updateGenre, deleteGenre} = require('../controllers/genres');
const { validateJWT } = require('../middlewares/validation-jwt');

const router = Router();

router
.get( '/' , validateJWT, getGenres)
.post( '/' ,
[
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], 
createGenre)
.put( '/:id' , 
[
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], 
updateGenre)
.delete('/:id', validateJWT, deleteGenre);


module.exports = router;