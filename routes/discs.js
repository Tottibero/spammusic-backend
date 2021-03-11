/*
 Ruta: /api/disc
*/


const {Router} = require('express');
const {check} = require('express-validator');
const {validateFields} = require('../middlewares/validation-fields');
const {getDiscs, createDisc, updateDisc, deleteDisc } = require('../controllers/discs');
const { validateJWT } = require('../middlewares/validation-jwt');

const router = Router();

router
.get( '/' , validateJWT, getDiscs)
.post( '/' ,
[
    validateJWT,
    check('title', 'Title is required').not().isEmpty(),
    check('release', 'Release date is required').not().isEmpty(),
    check('genre', 'Genre id must be valid').not().isMongoId(),
    check('artist', 'Artist id must be valid').not().isMongoId(),
    validateFields
], 
createDisc)
.put( '/:id' , 
[
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], 
updateDisc)
.delete('/:id', validateJWT, deleteDisc);



module.exports = router;